#!/usr/bin/env node

/**
 * Complete UofG Moodle Material Scraper (ES6 module)
 * Interactive login + Automated course material download
 */

import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import readline from 'readline';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Course configuration
const COURSES = {
  // Semester 1
  'COMPSCI4084': {
    name: 'Programming and Systems Development',
    localPath: 'materials/semester-1/COMPSCI4084-programming-systems'
  },
  'COMPSCI5089': {
    name: 'Data Science and Systems',
    localPath: 'materials/semester-1/COMPSCI5089-data-science-systems'
  },
  'COMPSCI5092': {
    name: 'Research and Professional Skills',
    localPath: 'materials/semester-1/COMPSCI5092-research-professional-skills'
  },
  'COMPSCI5100': {
    name: 'Machine Learning & AI',
    localPath: 'materials/semester-1/COMPSCI5100-ml-ai'
  },
  // Semester 2
  'COMPSCI4064/5088': {
    name: 'Big Data: Systems, Programming, and Management H/M',
    localPath: 'materials/semester-2/COMPSCI4064-5088-big-data'
  },
  'COMPSCI5012': {
    name: 'Internet Technology',
    localPath: 'materials/semester-2/COMPSCI5012-internet-technology'
  },
  'COMPSCI5057': {
    name: 'Human Computer Interaction Design and Evaluation (M)',
    localPath: 'materials/semester-2/COMPSCI5057-hci'
  },
  'COMPSCI5079': {
    name: 'Cryptography and Secure Development M',
    localPath: 'materials/semester-2/COMPSCI5079-cryptography'
  },
  'COMPSCI5093/5104': {
    name: 'Secured Software Engineering M/MSc',
    localPath: 'materials/semester-2/COMPSCI5093-5104-secured-software'
  },
  'COMPSCI5103': {
    name: 'Deep Learning for MSc (M)',
    localPath: 'materials/semester-2/COMPSCI5103-deep-learning'
  },
  // Handbook
  'HANDBOOK': {
    name: 'MSc (IT+) & MSc (CS+) Handbook - 2025/26',
    localPath: 'materials/handbook'
  }
};

const DOWNLOAD_PATH = path.join(__dirname, '..', 'downloads');

function sanitizeFilename(name) {
  if (!name) return 'download.bin';
  let s = String(name).trim();
  s = s.replace(/\s+/g, '_');
  s = s.replace(/[\\/:*?"<>|\u0000-\u001F]/g, '');
  if (s.length > 200) s = s.slice(0, 200);
  return s || 'download.bin';
}

function getFilenameFromContentDisposition(header) {
  if (!header) return null;
  const match = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/.exec(header);
  if (match) return decodeURIComponent(match[1] || match[2]);
  return null;
}

async function findRealFileLinkFromHtml(page, html, baseUrl) {
  const hrefMatch = html.match(/href=\"([^\"]*(?:pluginfile|\.pdf|\.pptx|\.docx|\.zip)[^\"]*)\"/i);
  if (hrefMatch && hrefMatch[1]) {
    const found = hrefMatch[1];
    try {
      return new URL(found, baseUrl).toString();
    } catch (e) {
      void e;
      return found;
    }
  }
  const pluginMatch = html.match(/(https?:\/\/[^'"\s]*pluginfile[^'"\s]*)/i);
  if (pluginMatch) return pluginMatch[1];
  return null;
}

async function downloadViaFetch(page, url, filename) {
  if (!fs.existsSync(DOWNLOAD_PATH)) fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });

  const cookies = await page.cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  console.log(`Attempting fetch download: ${url}`);
  let res;
  try {
    res = await fetch(url, {
      headers: {
        cookie: cookieHeader,
        'User-Agent': 'Mozilla/5.0 (compatible)'
      },
      redirect: 'follow'
    });
  } catch (err) {
    throw new Error(`Fetch request error: ${err.message}`);
  }

  if (!res) throw new Error('No response from fetch');

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    const body = await res.text();
    const realLink = await findRealFileLinkFromHtml(page, body, url);
    if (realLink) {
      console.log(`Found embedded file link in HTML: ${realLink} - retrying fetch`);
      res = await fetch(realLink, {
        headers: { cookie: cookieHeader, 'User-Agent': 'Mozilla/5.0 (compatible)' },
        redirect: 'follow'
      });
    } else {
      throw new Error('Response is HTML and no downloadable link found inside');
    }
  }

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  let outName = null;
  const cd = res.headers.get('content-disposition');
  if (cd) outName = getFilenameFromContentDisposition(cd);
  if (!outName && filename && filename !== 'unknown') outName = filename;
  if (!outName) {
    try {
      const parsed = new URL(res.url || url);
      outName = decodeURIComponent(path.basename(parsed.pathname)) || 'download.bin';
    } catch (e) {
      void e;
      outName = 'download.bin';
    }
  }

  outName = sanitizeFilename(outName);
  const dest = path.join(DOWNLOAD_PATH, outName);

  try {
    // res.body should be a Node stream in modern Node; pipeline from stream/promises handles it
    await pipeline(res.body, fs.createWriteStream(dest));
  } catch (err) {
    throw new Error(`Failed to write file: ${err.message}`);
  }

  console.log(`Saved file to ${dest}`);
  return dest;
}

class CompleteMoodleScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.isLoggedIn = false;
    this.currentCourseCode = null;
  }

  async initialize() {
    console.log('🚀 Initializing browser...');
    this.browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    this.page = await this.browser.newPage();
    
    const client = await this.page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOAD_PATH
    });

    if (!fs.existsSync(DOWNLOAD_PATH)) {
      fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });
    }
  }

  async login(email, password) {
    console.log('🔐 Starting login process...');
    
    try {
      await this.page.goto('https://moodle.gla.ac.uk/login/index.php', { waitUntil: 'networkidle2' });

      console.log('Clicking UofG email login button...');
      await this.page.waitForSelector('button[name="_eventId_AzureAuthn"], .button--full');
      await this.page.click('button[name="_eventId_AzureAuthn"], .button--full');

      console.log('Entering email address...');
      await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await this.page.waitForSelector('input[type="email"], #i0116');
      await this.page.type('input[type="email"], #i0116', email);
      
      const nextButton = await this.page.$('input[type="submit"], #idSIButton9');
      if (nextButton) await nextButton.click();

      console.log('Entering password...');
      await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await this.page.waitForSelector('input[type="password"], #i0118');
      await this.page.type('input[type="password"], #i0118', password);
      
      const signInButton = await this.page.$('input[type="submit"], #idSIButton9');
      if (signInButton) await signInButton.click();

      console.log('\n⚠️  Please complete any MFA verification in the browser...');
      console.log('The script will wait up to 2 minutes for you to complete authentication.');
      
      try {
        await this.waitForMoodleLogin();
      } catch (error) {
        void error;
        console.log('\n❌ Automatic login detection failed.');
        const manualConfirm = await askQuestion('Are you now on the Moodle dashboard? (y/n): ');
        
        if (manualConfirm.toLowerCase() === 'y' || manualConfirm.toLowerCase() === 'yes') {
          console.log('✅ Manual confirmation - continuing...');
        } else {
          throw new Error('Login was not completed successfully');
        }
      }
      
      this.isLoggedIn = true;
      console.log('✅ Successfully logged into Moodle!');
      
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async waitForMoodleLogin() {
    console.log('⏳ Waiting for authentication to complete...');
    console.log('Please complete any MFA verification in the browser if prompted.');
    
    let attempts = 0;
    const maxAttempts = 40;
    
    while (attempts < maxAttempts) {
      const currentUrl = this.page.url();
      
      if (currentUrl.includes('moodle.gla.ac.uk')) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Successfully reached Moodle');
        return;
      }
      
      if (attempts % 10 === 0 && attempts > 0) {
        console.log(`Still waiting... (${attempts * 3}s elapsed)`);
        if (currentUrl.includes('microsoft.com') || currentUrl.includes('login.microsoftonline.com')) {
          console.log('💡 If you see MFA prompts, please complete them in the browser');
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      attempts++;
    }
    
    const currentUrl = this.page.url();
    throw new Error(`Timeout waiting for Moodle login completion. Current URL: ${currentUrl}`);
  }

  async navigateToMyCourses() {
    console.log('📚 Navigating to My Courses...');
    
    const myCoursesSelectors = [
      'a[href*="/my/courses"]',
      'a[href*="courses"]',
      'text=My courses',
      '[aria-label*="courses"]'
    ];
    
    for (const selector of myCoursesSelectors) {
      try {
        const element = await this.page.$(selector.replace('text=', ''));
        if (element) {
          await element.click();
          await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
          console.log('✅ Navigated to courses page');
          return;
        }
      } catch (e) {
          // 忽略选择器检查中的错误
          void e;
      }
    }
    
    console.log('Direct navigation to courses page...');
    await this.page.goto('https://moodle.gla.ac.uk/my/courses.php', { waitUntil: 'networkidle2' });
  }

  async selectCourse() {
    console.log('\n📋 Available courses:');
    const courseKeys = Object.keys(COURSES);
    
    courseKeys.forEach((key, index) => {
      console.log(`${index + 1}. ${key} - ${COURSES[key].name}`);
    });
    
    const choice = await askQuestion(`\nEnter course number (1-${courseKeys.length}): `);
    const courseIndex = parseInt(choice) - 1;
    
    if (courseIndex < 0 || courseIndex >= courseKeys.length) {
      throw new Error('Invalid course selection');
    }
    
    const selectedCourse = courseKeys[courseIndex];
    console.log(`Selected: ${selectedCourse} - ${COURSES[selectedCourse].name}`);
    
    return selectedCourse;
  }

  async navigateToCourse(courseCode) {
    console.log(`🎯 Looking for course: ${COURSES[courseCode].name}`);
    
    const courseName = COURSES[courseCode].name;
    
    const courseLink = await this.page.evaluate((courseName, courseCode) => {
      const links = Array.from(document.querySelectorAll('a'));
      const foundLink = links.find(link => 
        link.textContent.includes(courseName) || 
        link.textContent.includes(courseCode) ||
        link.href.includes(courseCode)
      );
      return foundLink ? foundLink.href : null;
    }, courseName, courseCode);
    
    if (courseLink) {
      console.log(`Found course link: ${courseLink}`);
      await this.page.goto(courseLink, { waitUntil: 'networkidle2' });
      console.log('✅ Navigated to course page');
    } else {
      console.log('❌ Course not found on page, please navigate manually...');
      await askQuestion('Please navigate to the course manually and press Enter: ');
    }
  }

  async findAndClickResources() {
    console.log('🔍 Looking for Activities section with Resources...');
    
    const resourcesLink = await this.page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h3'));
      const activitiesHeading = headings.find(h => h.textContent.trim() === 'Activities');
      
      if (activitiesHeading) {
        const container = activitiesHeading.closest('div') || activitiesHeading.parentElement;
        const resourcesLink = container.querySelector('a[href*="resource"]');
        if (resourcesLink) return resourcesLink.href;
        const allLinksInContainer = container.querySelectorAll('a');
        const resourceLink = Array.from(allLinksInContainer).find(link => 
          link.textContent.toLowerCase().includes('resources')
        );
        if (resourceLink) return resourceLink.href;
      }
      
      const allLinks = Array.from(document.querySelectorAll('a'));
      const resourceLink = allLinks.find(link => 
        link.textContent.toLowerCase().includes('resources') ||
        link.href.includes('resource')
      );
      
      return resourceLink ? resourceLink.href : null;
    });
    
    if (resourcesLink) {
      console.log(`Found Resources link: ${resourcesLink}`);
      await this.page.goto(resourcesLink, { waitUntil: 'networkidle2' });
      console.log('✅ Navigated to Resources page');
      return true;
    } else {
      console.log('❌ Resources link not found');
      return false;
    }
  }

  async filterNewFiles(downloadLinks, courseCode) {
    console.log('🔍 Checking for new files...');
    const coursePath = COURSES[courseCode].localPath;
    const fullCoursePath = path.join(__dirname, '..', coursePath);
    
    const subdirs = ['lectures', 'resources', 'datasets'];
    const existingFiles = new Set();
    
    subdirs.forEach(subdir => {
      const dirPath = path.join(fullCoursePath, subdir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          existingFiles.add(file.toLowerCase());
        });
      }
    });
    
    const newFiles = downloadLinks.filter(link => {
      const sanitized = sanitizeFilename(link.filename || link.text);
      const isNew = !existingFiles.has(sanitized.toLowerCase());
      if (!isNew) {
        console.log(`⏭️  Already exists (skip): ${sanitized}`);
      }
      return isNew;
    });
    
    console.log(`✅ Found ${newFiles.length} new files out of ${downloadLinks.length} total`);
    return newFiles;
  }

  async downloadAllFilesFromTable() {
    console.log('📥 Downloading files from table...');

    const downloadLinks = await this.page.evaluate(() => {
      const tables = document.querySelectorAll('table');
      const links = [];

      tables.forEach(table => {
        const tableLinks = table.querySelectorAll('a[href]');
        tableLinks.forEach(link => {
          const href = link.href;
          const text = link.textContent.trim();

          if (href.includes('/mod/resource/') ||
              href.includes('/pluginfile.php/') ||
              href.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|zip|txt|csv)$/i) ||
              link.querySelector('img[src*="icon"]')) {

            links.push({
              url: href,
              text: text,
              filename: text || 'unknown'
            });
          }
        });
      });

      return links;
    });

    // Also look for links that point to Moodle "page" or folder pages which may contain attachments.
    const pageLinks = await this.page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      const pages = anchors
        .map(a => ({ href: a.href, text: a.textContent.trim() }))
        .filter(x => (/\/mod\/page\//i.test(x.href) || /mod\/page\/view.php/i.test(x.href) || /\/mod\/folder\//i.test(x.href)));
      const uniq = [];
      const seen = new Set();
      for (const p of pages) {
        if (!seen.has(p.href)) {
          seen.add(p.href);
          uniq.push(p);
        }
      }
      return uniq;
    });

    if (pageLinks.length > 0) {
      console.log(`Found ${pageLinks.length} linked Moodle pages that may contain attachments`);
    }
    console.log(`Found ${downloadLinks.length} downloadable files in table`);

    if (downloadLinks.length === 0 && pageLinks.length === 0) {
      console.log('❌ No downloadable files found');
      return [];
    }

    const downloadedFiles = [];
    
    // Build set of existing files once at the start
    const coursePath = COURSES[this.currentCourseCode].localPath;
    const fullCoursePath = path.join(__dirname, '..', coursePath);
    const subdirs = ['lectures', 'resources', 'datasets'];
    const existingFiles = new Set();
    
    subdirs.forEach(subdir => {
      const dirPath = path.join(fullCoursePath, subdir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          existingFiles.add(file.toLowerCase());
        });
      }
    });

    // Download table links immediately as we iterate
    console.log(`📥 Downloading ${downloadLinks.length} table files...`);
    for (let i = 0; i < downloadLinks.length; i++) {
      const link = downloadLinks[i];
      const sanitized = sanitizeFilename(link.filename || link.text);
      
      if (existingFiles.has(sanitized.toLowerCase())) {
        console.log(`⏭️  Already exists (skip): ${sanitized}`);
        continue;
      }

      console.log(`Downloading ${i + 1}/${downloadLinks.length}: ${link.text}`);

      try {
        const saved = await downloadViaFetch(this.page, link.url, link.filename);
        console.log(`✅ Saved: ${saved}`);
        downloadedFiles.push({ ...link, savedPath: saved });
        existingFiles.add(sanitized.toLowerCase());  // Track newly downloaded files
      } catch (fetchErr) {
        console.log(`⚠️ Fetch failed for ${link.url}: ${fetchErr.message}`);
        console.log('Fallback: attempt in-browser download...');

        try {
          const downloadPage = await this.browser.newPage();
          const client = await downloadPage.target().createCDPSession();
          await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: DOWNLOAD_PATH
          });

          await downloadPage.goto(link.url, { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 2000));
          await downloadPage.close();
          downloadedFiles.push(link);
          console.log(`✅ Downloaded via browser`);
        } catch (err) {
          console.log(`❌ Failed: ${err.message}`);
        }
      }
    }

    // Process linked pages
    if (pageLinks && pageLinks.length > 0) {
      console.log(`\n🔗 Processing ${pageLinks.length} linked page(s)...`);
      
      for (let j = 0; j < pageLinks.length; j++) {
        const pageLink = pageLinks[j];
        console.log(`➡️  [${j + 1}/${pageLinks.length}] ${pageLink.text}`);
        try {
          const downloadCandidates = await this.extractDownloadLinksFromPage(pageLink.href, 0);
          if (downloadCandidates && downloadCandidates.length > 0) {
            console.log(`   Found ${downloadCandidates.length} file(s)`);
            for (const candidate of downloadCandidates) {
              const sanitized = sanitizeFilename(candidate.filename || candidate.text);
              
              if (existingFiles.has(sanitized.toLowerCase())) {
                console.log(`   ⏭️  Already exists: ${sanitized}`);
                continue;
              }

              try {
                const saved = await downloadViaFetch(this.page, candidate.url, candidate.filename || candidate.text || 'unknown');
                console.log(`   ✅ Saved: ${saved}`);
                downloadedFiles.push({ ...candidate, savedPath: saved });
                existingFiles.add(sanitized.toLowerCase());
              } catch (err) {
                console.log(`   ⚠️ Fetch failed: ${err.message}`);
                try {
                  const downloadPage = await this.browser.newPage();
                  const client = await downloadPage.target().createCDPSession();
                  await client.send('Page.setDownloadBehavior', {
                    behavior: 'allow',
                    downloadPath: DOWNLOAD_PATH
                  });

                  await downloadPage.goto(candidate.url, { waitUntil: 'networkidle2' });
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  await downloadPage.close();
                  downloadedFiles.push(candidate);
                  console.log(`   ✅ Downloaded via browser`);
                } catch (err2) {
                  console.log(`   ❌ Failed: ${err2.message}`);
                }
              }
            }
          } else {
            console.log(`   ℹ️ No files found`);
          }
        } catch (err) {
          console.log(`   ❌ Failed to process: ${err.message}`);
        }
      }
    }

    console.log(`\n✅ Downloaded ${downloadedFiles.length} new files`);
    return downloadedFiles;
  }

  // Open a Moodle page URL and extract candidate file links (pluginfile urls, resource links, direct file extensions)
  // depth: 防止递归调用；仅在 depth=0 时搜索，避免链式调用导致的死循环
  async extractDownloadLinksFromPage(pageUrl, depth = 0) {
    const MAX_DEPTH = 0;  // 仅在当前页面搜索，不递归进入子页面
    if (depth > MAX_DEPTH) {
      console.log(`ℹ️ Max depth reached, skipping further page traversal`);
      return [];
    }

    const tempPage = await this.browser.newPage();
    // 设置超时保护（30 秒），防止页面长时间加载
    const pageTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Page load timeout (30s)')), 30000)
    );

    try {
      // 竞速：要么加载完成，要么超时
      await Promise.race([
        tempPage.goto(pageUrl, { waitUntil: 'networkidle2' }),
        pageTimeout
      ]);

      // 仅提取文件类型链接，排除其他 Moodle activity 页面链接以防止链式调用
      const links = await tempPage.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        const out = [];
        anchors.forEach(a => {
          const href = a.href;
          const text = (a.textContent || a.getAttribute('title') || '').trim();
          if (!href) return;
          // 仅提取文件类型链接（pluginfile 或常见文件后缀），排除其他 Moodle activity 页面（如 /mod/page/, /mod/resource/ 等）
          if (href.includes('/pluginfile.php/') || href.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|zip|txt|csv)$/i)) {
            out.push({ url: href, text: text, filename: text || 'unknown' });
          }
        });

        // Also try to find embedded <a> tags inside the page content area that may be rendered as attachments
        const contentArea = document.querySelector('.page, .content, .region-content, #page');
        if (contentArea) {
          const innerAnchors = Array.from(contentArea.querySelectorAll('a[href]'));
          innerAnchors.forEach(a => {
            const href = a.href;
            const text = (a.textContent || a.getAttribute('title') || '').trim();
            if (!href) return;
            // 仅提取文件类型链接，排除其他 Moodle activity 页面
            if (href.includes('/pluginfile.php/') || href.match(/\.(pdf|doc|docx|ppt|pptx|zip|txt|csv)$/i)) {
              out.push({ url: href, text: text, filename: text || 'unknown' });
            }
          });
        }

        // dedupe
        const uniq = [];
        const seen = new Set();
        out.forEach(o => {
          if (!seen.has(o.url)) {
            seen.add(o.url);
            uniq.push(o);
          }
        });

        return uniq;
      });

      await tempPage.close();
      return links;
    } catch (err) {
      if (err.message.includes('timeout')) {
        console.log(`⚠️ Page load timeout (30s) for: ${pageUrl}`);
      } else {
        console.log(`⚠️ Error extracting links from page: ${err.message}`);
      }
      try { await tempPage.close(); } catch {}
      return [];  // 返回空数组而不是抛出异常，避免中断整个流程
    }
  }

  async organizeMaterials(courseCode) {
    console.log('📁 Organizing downloaded materials...');
    
    const coursePath = COURSES[courseCode].localPath;
    const fullCoursePath = path.join(__dirname, '..', coursePath);
    
    const subdirs = ['lectures', 'resources', 'datasets'];
    subdirs.forEach(subdir => {
      const dirPath = path.join(fullCoursePath, subdir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
    
    const downloadedFilesList = fs.readdirSync(DOWNLOAD_PATH);
    console.log(`Found ${downloadedFilesList.length} files in downloads folder`);
    
    downloadedFilesList.forEach(filename => {
      const sourcePath = path.join(DOWNLOAD_PATH, filename);
      let destSubdir = 'resources';
      
      if (filename.toLowerCase().includes('lecture') || 
          filename.toLowerCase().includes('slide') ||
          filename.match(/\.(ppt|pptx)$/i)) {
        destSubdir = 'lectures';
      } else if (filename.match(/\.(csv|json|xlsx|data)$/i)) {
        destSubdir = 'datasets';
      }
      
      const destPath = path.join(fullCoursePath, destSubdir, filename);
      
      try {
        fs.renameSync(sourcePath, destPath);
        console.log(`Moved: ${filename} → ${destSubdir}/`);
      } catch (error) {
        console.log(`Failed to move ${filename}: ${error.message}`);
      }
    });
    
    console.log('✅ Materials organized successfully');
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
    rl.close();
  }
}

async function interactiveLogin() {
  console.log('🎓 UofG Moodle Interactive Login Tool');
  console.log('=====================================');
  console.log('This mode will help you complete the login process manually when MFA is required.\n');

  let email = process.env.MOODLE_USER || process.env.UOFG_EMAIL || process.env.EMAIL;
  let password = process.env.MOODLE_PASS || process.env.UOFG_PASSWORD || process.env.PASSWORD;

  if (!email) {
    email = await askQuestion('Enter your UofG email address: ');
  }
  if (!password) {
    password = await askQuestion('Enter your password: ');
  }

  const scraper = new CompleteMoodleScraper();
  
  try {
    await scraper.initialize();
    await scraper.login(email, password);

    console.log('\nWhat would you like to do next?');
    console.log('1. Navigate to a specific course');
    console.log('2. Stay on dashboard');
    console.log('3. Exit');
    
    const choice = await askQuestion('Enter your choice (1-3): ');
    
    if (choice === '1') {
      console.log('\nAvailable courses:');
      console.log('- COMPSCI4084 (Programming and Systems Development)');
      console.log('- COMPSCI5089 (Data Science and Systems)');
      console.log('- COMPSCI5092 (Research and Professional Skills)');
      console.log('- COMPSCI5100 (Machine Learning & AI)');
      console.log('- HANDBOOK (MSc (IT+) & MSc (CS+) Handbook - 2025/26)');
      
      const courseCode = await askQuestion('Enter course code (e.g., COMPSCI4084 or HANDBOOK): ');
      
      console.log(`Navigating to ${courseCode}...`);
      console.log('You can now manually navigate to your course in the browser.');
    }
    
    if (choice !== '3') {
      await askQuestion('Press Enter when you want to close the browser: ');
    }

  } catch (error) {
    console.error('Error during login process:', error.message);
  } finally {
    await scraper.close();
  }
}

async function main() {
  console.log('🎓 UofG Moodle Complete Material Scraper');
  console.log('=========================================');

  // Check for interactive mode flag
  const args = process.argv.slice(2);
  const isInteractiveMode = args.includes('--interactive') || args.includes('-i');

  if (isInteractiveMode) {
    return await interactiveLogin();
  }

  let email = process.env.MOODLE_USER || process.env.UOFG_EMAIL || process.env.EMAIL;
  let password = process.env.MOODLE_PASS || process.env.UOFG_PASSWORD || process.env.PASSWORD;

  if (!email) {
    email = await askQuestion('Enter your UofG email address: ');
  }
  if (!password) {
    password = await askQuestion('Enter your password: ');
  }
  
  const scraper = new CompleteMoodleScraper();
  
  try {
    await scraper.initialize();
    await scraper.login(email, password);

    let keepRunning = true;

    while (keepRunning) {
      await scraper.navigateToMyCourses();

      const courseCode = await scraper.selectCourse();
      scraper.currentCourseCode = courseCode;  // Set for filterNewFiles
      await scraper.navigateToCourse(courseCode);

      const foundResources = await scraper.findAndClickResources();

      if (foundResources) {
  await scraper.downloadAllFilesFromTable();
  await scraper.organizeMaterials(courseCode);
        console.log(`\n🎉 Material collection for ${courseCode} complete!`);
        console.log(`Check the ${COURSES[courseCode].localPath} folder for your materials.`);
      } else {
        console.log('❌ Could not find Resources section. Please check the course structure.');
      }

      const again = await askQuestion('\nDo you want to scrape another course? (y/n): ');
      if (!again || !['y', 'yes'].includes(again.toLowerCase().trim())) {
        keepRunning = false;
      } else {
        console.log('\n🔁 Preparing to scrape another course. You may navigate in the browser if needed.');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await scraper.close();
  }
}

if (process.argv[1] === __filename) {
  main().catch(console.error);
}

export { CompleteMoodleScraper };
