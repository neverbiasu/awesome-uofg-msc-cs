#!/usr/bin/env node

/**
 * Interactive Login Tool for UofG Moodle
 * Allows manual intervention for MFA and other security checks
 */

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

async function interactiveLogin() {
  console.log('🎓 UofG Moodle Interactive Login Tool');
  console.log('This tool will help you complete the login process manually when MFA is required.\n');

  const email = await askQuestion('Enter your UofG email address: ');
  const password = await askQuestion('Enter your password: ');

  console.log('\nStarting browser...');
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1280, height: 720 }
  });
  
  const page = await browser.newPage();

  try {
    console.log('Navigating to Moodle login...');
    await page.goto('https://moodle.gla.ac.uk/login/index.php', { waitUntil: 'networkidle2' });

    console.log('Clicking UofG email login button...');
    await page.waitForSelector('button[name="_eventId_AzureAuthn"], .button--full');
    await page.click('button[name="_eventId_AzureAuthn"], .button--full');

    console.log('Entering email address...');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForSelector('input[type="email"], #i0116');
    await page.type('input[type="email"], #i0116', email);
    
    const nextButton = await page.$('input[type="submit"], #idSIButton9');
    if (nextButton) await nextButton.click();

    console.log('Entering password...');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForSelector('input[type="password"], #i0118');
    await page.type('input[type="password"], #i0118', password);
    
    const signInButton = await page.$('input[type="submit"], #idSIButton9');
    if (signInButton) await signInButton.click();

    console.log('\n⚠️  MANUAL INTERVENTION REQUIRED ⚠️');
    console.log('The browser window should now be open.');
    console.log('Please complete any additional security verification (MFA, etc.) manually in the browser.');
    console.log('Once you see the Moodle dashboard, press Enter to continue...\n');

    await askQuestion('Press Enter when you have successfully logged into Moodle: ');

    // Check if we're now on Moodle
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    if (currentUrl.includes('moodle.gla.ac.uk')) {
      console.log('✅ Successfully logged into Moodle!');
      
      // Check for user menu to confirm login
      const userMenu = await page.$('.usermenu, .user-menu, #user-menu, .userbutton, [data-region="user-menu"]');
      if (userMenu) {
        console.log('✅ User menu found - login confirmed!');
        
        console.log('\nWhat would you like to do next?');
        console.log('1. Navigate to a specific course');
        console.log('2. Stay on dashboard');
        console.log('3. Exit');
        
        const choice = await askQuestion('Enter your choice (1-3): ');
        
        if (choice === '1') {
          console.log('\nAvailable courses:');
          console.log('- COMPSCI4084 (Programming and Systems Development)');
          console.log('- COMPSCI5089 (Data Science and Systems)');
          console.log('- COMPSCI5100 (Machine Learning & AI)');
          
          const courseCode = await askQuestion('Enter course code (e.g., COMPSCI4084): ');
          
          // Try to navigate to course (this would need actual course URLs)
          console.log(`Navigating to ${courseCode}...`);
          console.log('You can now manually navigate to your course in the browser.');
        }
        
        if (choice !== '3') {
          await askQuestion('Press Enter when you want to close the browser: ');
        }
      } else {
        console.log('⚠️  Could not find user menu. You may need to complete additional steps.');
      }
    } else {
      console.log('❌ Still not on Moodle. Please check the browser and complete any remaining steps.');
    }

  } catch (error) {
    console.error('Error during login process:', error.message);
  } finally {
    await browser.close();
    rl.close();
    console.log('\nBrowser closed. Goodbye!');
  }
}

if (require.main === module) {
  interactiveLogin().catch(console.error);
}

module.exports = { interactiveLogin };
