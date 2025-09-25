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
      } catch (e) {}
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

  async downloadAllFilesFromTable() {
    console.log('📥 Downloading all files from table...');

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
          try {
            console.log('Response status:', response && response.status());
          } catch (e) {}
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

if (process.argv[1] === __filename) {
  main().catch(console.error);
}

export { CompleteMoodleScraper };
