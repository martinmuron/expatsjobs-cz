import { test, expect } from '@playwright/test';

test.describe('ExpatsJobs.cz Screenshots', () => {
  test('Homepage screenshot', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'screenshots/homepage.png', 
      fullPage: true 
    });
  });

  test('Jobs page screenshot', async ({ page }) => {
    await page.goto('http://localhost:4000/jobs');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'screenshots/jobs-page.png', 
      fullPage: true 
    });
  });

  test('Job detail page screenshot', async ({ page }) => {
    await page.goto('http://localhost:4000/jobs/1');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'screenshots/job-detail.png', 
      fullPage: true 
    });
  });

  test('Post job page screenshot', async ({ page }) => {
    await page.goto('http://localhost:4000/post-job');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'screenshots/post-job.png', 
      fullPage: true 
    });
  });

  test('Search functionality', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForLoadState('networkidle');
    
    // Test search functionality
    await page.fill('input[placeholder*="Job title"]', 'Software Engineer');
    await page.click('button:has-text("Search Jobs")');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/jobs\?q=Software\+Engineer/);
    await page.screenshot({ 
      path: 'screenshots/search-results.png', 
      fullPage: true 
    });
  });
});