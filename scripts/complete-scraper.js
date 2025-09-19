#!/usr/bin/env node

/**
 * Complete UofG Moodle Material Scraper
 * Interactive login + Automated course material download
 */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const readline = require('readline');

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
  'COMPSCI4084': {
    name: 'Programming and Systems Development',
    localPath: 'materials/semester-1/COMPSCI4084-programming-systems'
  },
  'COMPSCI5089': {
    name: 'Data Science and Systems',
    localPath: 'materials/semester-1/COMPSCI5089-data-science-systems'
  },
  'COMPSCI5100': {
    name: 'Machine Learning & AI',
    localPath: 'materials/semester-1/COMPSCI5100-ml-ai'
  },
  'HANDBOOK': {
    name: 'MSc (IT+) & MSc (CS+) Handbook - 2025/26',
    localPath: 'materials/handbook'
  }
};

const DOWNLOAD_PATH = path.join(__dirname, '..', 'downloads');

const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);

function sanitizeFilename(name) {
  if (!name) return 'download.bin';
  // remove path separators and control chars, replace spaces with underscore
  let s = String(name).trim();
  s = s.replace(/\s+/g, '_');
  s = s.replace(/[\\/:*?"<>|\u0000-\u001F]/g, '');
  // limit length
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
  // look for pluginfile.php or links containing common extensions
  const hrefMatch = html.match(/href=\"([^\"]*(?:pluginfile|\.pdf|\.pptx|\.docx|\.zip)[^\"]*)\"/i);
  if (hrefMatch && hrefMatch[1]) {
    const found = hrefMatch[1];
    try {
      return new URL(found, baseUrl).toString();
    } catch (e) {
      return found;
    }
  }
  // fallback: try to find any link with pluginfile
  const pluginMatch = html.match(/(https?:\/\/[^'"\s]*pluginfile[^'"\s]*)/i);
  if (pluginMatch) return pluginMatch[1];
  return null;
}

async function downloadViaFetch(page, url, filename) {
  // Ensure download directory exists
  if (!fs.existsSync(DOWNLOAD_PATH)) fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });

  // Use logged-in page cookies to fetch the file directly (avoids PDF viewer interception)
  const cookies = await page.cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  // Try to fetch the URL
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

  // If response is HTML, try to locate real file link inside and re-fetch
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

  // Determine filename: Content-Disposition > passed filename > URL path
  let outName = null;
  const cd = res.headers.get('content-disposition');
  if (cd) outName = getFilenameFromContentDisposition(cd);
  if (!outName && filename && filename !== 'unknown') outName = filename;
  if (!outName) {
    try {
      const parsed = new URL(res.url || url);
      outName = decodeURIComponent(path.basename(parsed.pathname)) || 'download.bin';
    } catch (e) {
      outName = 'download.bin';
    }
  }

  outName = sanitizeFilename(outName);
  const dest = path.join(DOWNLOAD_PATH, outName);

  // Stream to file
  try {
    await streamPipeline(res.body, fs.createWriteStream(dest));
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
  }

  async initialize() {
    console.log('🚀 Initializing browser...');
    this.browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    this.page = await this.browser.newPage();
    
    // Set download behavior
    const client = await this.page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOAD_PATH
    });

    // Ensure download directory exists
    if (!fs.existsSync(DOWNLOAD_PATH)) {
      fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });
    }
  }

  async login(email, password) {
    console.log('🔐 Starting login process...');
    
    try {
      // Navigate to Moodle
      await this.page.goto('https://moodle.gla.ac.uk/login/index.php', { waitUntil: 'networkidle2' });

      // Click UofG login button
      console.log('Clicking UofG email login button...');
      await this.page.waitForSelector('button[name="_eventId_AzureAuthn"], .button--full');
      await this.page.click('button[name="_eventId_AzureAuthn"], .button--full');

      // Enter email
      console.log('Entering email address...');
      await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await this.page.waitForSelector('input[type="email"], #i0116');
      await this.page.type('input[type="email"], #i0116', email);
      
      const nextButton = await this.page.$('input[type="submit"], #idSIButton9');
      if (nextButton) await nextButton.click();

      // Enter password
      console.log('Entering password...');
      await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await this.page.waitForSelector('input[type="password"], #i0118');
      await this.page.type('input[type="password"], #i0118', password);
      
      const signInButton = await this.page.$('input[type="submit"], #idSIButton9');
      if (signInButton) await signInButton.click();

      // Handle MFA manually
      console.log('\n⚠️  Please complete any MFA verification in the browser...');
      console.log('The script will wait up to 2 minutes for you to complete authentication.');
      
      try {
        await this.waitForMoodleLogin();
      } catch (error) {
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
    const maxAttempts = 40; // Increase timeout to 2 minutes
    
    while (attempts < maxAttempts) {
      const currentUrl = this.page.url();
      
      if (currentUrl.includes('moodle.gla.ac.uk')) {
        // Wait a bit more to ensure page loads
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Successfully reached Moodle');
        return;
      }
      
      // Give user feedback every 10 attempts (30 seconds)
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
    
    // Try to find "My courses" link
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
        // Try next selector
      }
    }
    
    // If direct navigation fails, try going to /my/courses.php
    console.log('Direct navigation to courses page...');
    await this.page.goto('https://moodle.gla.ac.uk/my/courses.php', { waitUntil: 'networkidle2' });
  }

  async selectCourse() {
    console.log('\n📋 Available courses:');
    const courseKeys = Object.keys(COURSES);
    
    courseKeys.forEach((key, index) => {
      console.log(`${index + 1}. ${key} - ${COURSES[key].name}`);
    });
    
    const choice = await askQuestion('\nEnter course number (1-4): ');
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
    
    // Look for course link on the page
    const courseName = COURSES[courseCode].name;
    
    // Try multiple approaches to find the course
    const courseSelectors = [
      `a[title*="${courseName}"]`,
      `a[href*="${courseCode}"]`,
      `a:contains("${courseName}")`,
      `a:contains("${courseCode}")`,
      `.coursename a:contains("${courseName}")`,
      `.course-title a:contains("${courseName}")`
    ];
    
    // Use evaluate to find course link by text content
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
    
    // Find h3 with "Activities" text and look for Resources link
    const resourcesLink = await this.page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h3'));
      const activitiesHeading = headings.find(h => h.textContent.trim() === 'Activities');
      
      if (activitiesHeading) {
        // Look for Resources link in the same container/div
        const container = activitiesHeading.closest('div') || activitiesHeading.parentElement;
        const resourcesLink = container.querySelector('a[href*="resource"]');
        if (resourcesLink) return resourcesLink.href;
        
        // Also check for text content
        const allLinksInContainer = container.querySelectorAll('a');
        const resourceLink = Array.from(allLinksInContainer).find(link => 
          link.textContent.toLowerCase().includes('resources')
        );
        if (resourceLink) return resourceLink.href;
      }
      
      // Fallback: look for any Resources link on the page
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

  async downloadAllFilesFromTable() {
    console.log('📥 Downloading all files from table...');

    // Find all download links in tables
    const downloadLinks = await this.page.evaluate(() => {
      const tables = document.querySelectorAll('table');
      const links = [];

      tables.forEach(table => {
        const tableLinks = table.querySelectorAll('a[href]');
        tableLinks.forEach(link => {
          // Filter for file download links (typically have file extensions or resource paths)
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

    console.log(`Found ${downloadLinks.length} downloadable files`);

    if (downloadLinks.length === 0) {
      console.log('❌ No downloadable files found in tables');
      return [];
    }

    const downloadedFiles = [];

    for (let i = 0; i < downloadLinks.length; i++) {
      const link = downloadLinks[i];
      console.log(`Downloading ${i + 1}/${downloadLinks.length}: ${link.text} -> ${link.url}`);

      try {
        // Prefer direct fetch using authenticated cookies to avoid in-browser PDF viewer
        const saved = await downloadViaFetch(this.page, link.url, link.filename);
        console.log(`✅ Saved via fetch: ${saved}`);
        downloadedFiles.push({ ...link, savedPath: saved });
      } catch (fetchErr) {
        console.log(`⚠️ Fetch download failed for ${link.url}: ${fetchErr.message}`);
        console.log('Fallback: attempt in-browser download...');

        try {
          const downloadPage = await this.browser.newPage();
          const client = await downloadPage.target().createCDPSession();
          await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: DOWNLOAD_PATH
          });

          const response = await downloadPage.goto(link.url, { waitUntil: 'networkidle2' });
          // log status for debugging
          try {
            console.log('Response status:', response && response.status());
          } catch (e) {
            // ignore if response is null
          }

          // Wait a moment for download to start
          await new Promise(resolve => setTimeout(resolve, 2000));
          await downloadPage.close();
          downloadedFiles.push(link);
        } catch (err) {
          console.log(`❌ Failed fallback download for ${link.text}: ${err.message}`);
        }
      }
    }

    console.log(`✅ Downloaded ${downloadedFiles.length} files to ${DOWNLOAD_PATH}`);
    return downloadedFiles;
  }

  async organizeMaterials(courseCode, downloadedFiles) {
    console.log('📁 Organizing downloaded materials...');
    
    const coursePath = COURSES[courseCode].localPath;
    const fullCoursePath = path.join(__dirname, '..', coursePath);
    
    // Ensure course directories exist
    const subdirs = ['lectures', 'resources', 'datasets'];
    subdirs.forEach(subdir => {
      const dirPath = path.join(fullCoursePath, subdir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
    
    // List downloaded files
    const downloadedFilesList = fs.readdirSync(DOWNLOAD_PATH);
    console.log(`Found ${downloadedFilesList.length} files in downloads folder`);
    
    // Move files to appropriate course folder
    downloadedFilesList.forEach(filename => {
      const sourcePath = path.join(DOWNLOAD_PATH, filename);
      
      // Determine destination based on file type
      let destSubdir = 'resources'; // default
      
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

async function main() {
  console.log('🎓 UofG Moodle Complete Material Scraper');
  console.log('=========================================');

  // Read credentials from environment (.env) or prompt if missing.
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
      await scraper.navigateToCourse(courseCode);

      const foundResources = await scraper.findAndClickResources();

      if (foundResources) {
        const downloadedFiles = await scraper.downloadAllFilesFromTable();
        await scraper.organizeMaterials(courseCode, downloadedFiles);
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

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CompleteMoodleScraper };
