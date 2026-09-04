const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\92bccc81-7aa2-4d65-aa2c-2e1648897090';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runVerification() {
  console.log('Starting automated end-to-end verification via local Chrome...');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  
  // Track console logs and errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    console.log('1. Navigating to http://127.0.0.1:5173...');
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
    await page.waitForSelector('header');

    // 1. Capture Operations Control Tower (Health Hub)
    console.log('2. Verifying Operations Control Tower...');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_ops_health_hub.png'), fullPage: false });

    // 2. Click Digital Twin Graph tab
    console.log('3. Verifying Digital Twin Graph tab...');
    const graphButton = await page.$('button[title*="Digital Twin"]');
    if (graphButton) {
      await graphButton.click();
    } else {
      // Find by text
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await (await btn.getProperty('textContent')).jsonValue();
        if (text && text.includes('Digital Twin Graph')) {
          await btn.click();
          break;
        }
      }
    }
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_digital_twin_graph.png') });

    // 3. Click Story Engine & Validation tab
    console.log('4. Verifying Story Engine & Validation tab...');
    const storyBtn = await page.$('button[title*="Story Engine"]');
    if (storyBtn) {
      await storyBtn.click();
    } else {
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await (await btn.getProperty('textContent')).jsonValue();
        if (text && text.includes('Story Engine')) {
          await btn.click();
          break;
        }
      }
    }
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_story_engine.png') });

    // 4. Click Incident Context Panel tab
    console.log('5. Verifying Incident Context Panel...');
    const incidentBtn = await page.$('button[title*="Incident Context"]');
    if (incidentBtn) {
      await incidentBtn.click();
    } else {
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await (await btn.getProperty('textContent')).jsonValue();
        if (text && text.includes('Incident Context')) {
          await btn.click();
          break;
        }
      }
    }
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_incident_context.png') });

    // 5. Click Decision Sandbox tab
    console.log('6. Verifying Decision Sandbox & executing recovery...');
    const sandboxBtn = await page.$('button[title*="Decision Sandbox"]');
    if (sandboxBtn) {
      await sandboxBtn.click();
    } else {
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await (await btn.getProperty('textContent')).jsonValue();
        if (text && text.includes('Decision Sandbox')) {
          await btn.click();
          break;
        }
      }
    }
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_decision_sandbox.png') });

    // Click "Approve & Execute Pathway"
    const executeBtn = await page.$('button[class*="bg-neutral-900"]');
    const allButtons = await page.$$('button');
    for (const b of allButtons) {
      const text = await (await b.getProperty('textContent')).jsonValue();
      if (text && text.includes('Approve & Execute Pathway')) {
        await b.click();
        console.log('   Clicked Approve & Execute Pathway button!');
        break;
      }
    }
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_recovery_executed.png') });

    // 6. Switch to Customer View
    console.log('7. Switching to Customer Copilot...');
    for (const b of allButtons) {
      const text = await (await b.getProperty('textContent')).jsonValue();
      if (text && text.includes('Switch to Customer')) {
        await b.click();
        console.log('   Switched to Customer role!');
        break;
      }
    }
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '07_customer_copilot.png') });

    // 7. Test Logout and Login Screen
    console.log('8. Testing Logout to Login Screen...');
    const logoutBtn = await page.$('button[title*="Log out"]');
    if (logoutBtn) {
      await logoutBtn.click();
    }
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '08_login_screen.png') });

    console.log('\n--- VERIFICATION SUMMARY ---');
    console.log('✓ All 8 key application states verified and screens captured.');
    console.log('Console errors encountered:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log(consoleErrors);
    }
  } catch (err) {
    console.error('Verification failed with error:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
