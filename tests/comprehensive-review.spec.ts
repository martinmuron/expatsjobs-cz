import { test, expect } from '@playwright/test';

test.describe('ExpatsJobs.cz Comprehensive Design Review', () => {
  test('Homepage design review', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot for review
    await page.screenshot({ 
      path: 'test-results/homepage-current.png', 
      fullPage: true 
    });

    // Basic checks
    await expect(page).toHaveTitle(/ExpatsJobs/i);
    
    // Check main sections are present
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check hero section
    await expect(page.locator('h1')).toBeVisible();
    
    console.log('Homepage screenshot captured and basic checks passed');
  });

  test('Jobs page design review', async ({ page }) => {
    await page.goto('http://localhost:3001/jobs');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/jobs-page-current.png', 
      fullPage: true 
    });

    // Check job listings are displayed
    await expect(page.locator('[data-testid="job-card"], .job-card, .job-listing')).toBeVisible();
    
    console.log('Jobs page screenshot captured');
  });

  test('Individual job listing design review', async ({ page }) => {
    await page.goto('http://localhost:3001/jobs');
    await page.waitForLoadState('networkidle');
    
    // Try to find and click on first job listing
    const firstJob = page.locator('[data-testid="job-card"], .job-card, .job-listing').first();
    if (await firstJob.count() > 0) {
      await firstJob.click();
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ 
        path: 'test-results/individual-job-current.png', 
        fullPage: true 
      });
      
      console.log('Individual job page screenshot captured');
    } else {
      // Fallback: try a direct job URL
      await page.goto('http://localhost:3001/jobs/1');
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ 
        path: 'test-results/individual-job-current.png', 
        fullPage: true 
      });
      
      console.log('Individual job page (direct URL) screenshot captured');
    }
  });

  test('Company admin interface review', async ({ page }) => {
    // Try different potential admin routes
    const adminRoutes = [
      '/admin/companies',
      '/dashboard/companies',
      '/company-admin',
      '/admin',
      '/dashboard'
    ];

    for (const route of adminRoutes) {
      try {
        await page.goto(`http://localhost:3001${route}`);
        await page.waitForLoadState('networkidle');
        
        // If we get a successful page (not 404), capture it
        const title = await page.title();
        if (!title.includes('404') && !title.includes('Not Found')) {
          await page.screenshot({ 
            path: `test-results/admin-companies-${route.replace(/[^a-z0-9]/gi, '-')}.png`, 
            fullPage: true 
          });
          console.log(`Company admin interface screenshot captured for ${route}`);
          break;
        }
      } catch (error) {
        // Continue to next route if this one fails
        continue;
      }
    }
  });

  test('User admin interface review', async ({ page }) => {
    // Try different potential user admin routes
    const userAdminRoutes = [
      '/admin/users',
      '/dashboard/users',
      '/profile',
      '/user-dashboard'
    ];

    for (const route of userAdminRoutes) {
      try {
        await page.goto(`http://localhost:3001${route}`);
        await page.waitForLoadState('networkidle');
        
        const title = await page.title();
        if (!title.includes('404') && !title.includes('Not Found')) {
          await page.screenshot({ 
            path: `test-results/admin-users-${route.replace(/[^a-z0-9]/gi, '-')}.png`, 
            fullPage: true 
          });
          console.log(`User admin interface screenshot captured for ${route}`);
          break;
        }
      } catch (error) {
        continue;
      }
    }
  });

  test('Contact page design review', async ({ page }) => {
    await page.goto('http://localhost:3001/contact');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'test-results/contact-page-current.png', 
      fullPage: true 
    });

    // Check contact form is present
    await expect(page.locator('form')).toBeVisible();
    
    console.log('Contact page screenshot captured');
  });

  test('Additional pages review', async ({ page }) => {
    const additionalPages = [
      '/about',
      '/terms',
      '/privacy',
      '/post-job',
      '/login',
      '/register'
    ];

    for (const pagePath of additionalPages) {
      try {
        await page.goto(`http://localhost:3001${pagePath}`);
        await page.waitForLoadState('networkidle');
        
        await page.screenshot({ 
          path: `test-results/${pagePath.substring(1) || 'root'}-page-current.png`, 
          fullPage: true 
        });
        
        console.log(`${pagePath} page screenshot captured`);
      } catch (error) {
        console.log(`Failed to capture ${pagePath}: ${error.message}`);
      }
    }
  });
});