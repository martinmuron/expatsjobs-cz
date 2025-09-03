const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1280, height: 720 });
  
  console.log('🌐 Checking ExpatsJobs.cz design...');
  
  try {
    // Homepage
    await page.goto('https://expatsjobs.vercel.app');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'homepage.png', fullPage: true });
    console.log('✅ Homepage screenshot saved');
    
    // Jobs page
    await page.click('text=Browse Jobs');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'jobs-page.png', fullPage: true });
    console.log('✅ Jobs page screenshot saved');
    
    // Sign up page
    await page.goto('https://expatsjobs.vercel.app');
    await page.click('text=Sign Up');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'signup-page.png', fullPage: true });
    console.log('✅ Sign up page screenshot saved');
    
    // Check if header is present on signup page
    const headerExists = await page.locator('header').count();
    console.log(`📋 Header present on signup page: ${headerExists > 0 ? '✅ Yes' : '❌ No'}`);
    
    // Employer registration
    await page.click('text=I\'m an Employer');
    await page.click('text=Continue');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'employer-registration.png', fullPage: true });
    console.log('✅ Employer registration screenshot saved');
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://expatsjobs.vercel.app');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'mobile-homepage.png', fullPage: true });
    console.log('✅ Mobile homepage screenshot saved');
    
  } catch (error) {
    console.error('Error during design check:', error);
  }
  
  await browser.close();
  console.log('🎉 Design check complete! Screenshots saved.');
})();