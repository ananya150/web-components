const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const components = [
  'button',
  'copy-button', 
  'flip-button',
  'github-stars-button',
  'icon-button',
  'input-button',
  'liquid-button',
  'ripple-button',
  'magnetic-button',
  'liquid-glass-button'
];

async function generateScreenshots() {
  console.log('🚀 Starting screenshot generation...');
  
  // Create thumbs directory if it doesn't exist
  const thumbsDir = path.join(__dirname, '..', 'thumbs');
  if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync(thumbsDir, { recursive: true });
  }

  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--force-device-scale-factor=2' // Enable high DPI rendering
    ]
  });
  
  const page = await browser.newPage();
  
  // Set viewport to ensure consistent rendering with high DPI
  await page.setViewportSize({ width: 1200, height: 800 });
  
  // Set device scale factor for crisp screenshots
  await page.emulateMedia({ media: 'screen' });
  await page.evaluate(() => {
    // Force high quality rendering
    document.documentElement.style.imageRendering = 'crisp-edges';
    document.documentElement.style.textRendering = 'optimizeLegibility';
  });
  
  try {
    console.log('📱 Navigating to screenshots page...');
    await page.goto('http://localhost:3000/screenshots', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for all components to load
    await page.waitForTimeout(2000);
    
    console.log('📸 Capturing component screenshots...');
    
    for (const componentName of components) {
      try {
        console.log(`  📷 Capturing ${componentName}...`);
        
        // Wait for the specific component to be visible
        const selector = `#${componentName}`;
        await page.waitForSelector(selector, { timeout: 10000 });
        
        // Wait a bit more for any animations to settle
        await page.waitForTimeout(1000);
        
        // Take screenshot of the specific element
        const element = await page.locator(selector);
        const screenshotPath = path.join(thumbsDir, `${componentName}.png`);
        
        await element.screenshot({
          path: screenshotPath,
          type: 'png',
          animations: 'disabled', // Disable animations for consistent screenshots
          scale: 'device' // Use device scale factor for crisp images
        });
        
        console.log(`  ✅ ${componentName}.png saved`);
        
        // Brief pause between screenshots
        await page.waitForTimeout(500);
        
      } catch (error) {
        console.error(`  ❌ Failed to capture ${componentName}:`, error.message);
      }
    }
    
    console.log('🎯 Verifying screenshot dimensions...');
    
    // Verify all screenshots were created and have correct dimensions
    const sharp = require('sharp').default || require('sharp');
    let allValid = true;
    
    for (const componentName of components) {
      const screenshotPath = path.join(thumbsDir, `${componentName}.png`);
      
      if (fs.existsSync(screenshotPath)) {
        try {
          const { width, height } = await sharp(screenshotPath).metadata();
          
          // Account for device scale factor (2x) - images will be 600x300 but display as 300x150
          if ((width === 300 && height === 150) || (width === 600 && height === 300)) {
            console.log(`  ✅ ${componentName}.png - ${width}x${height}`);
          } else {
            console.log(`  ⚠️  ${componentName}.png - ${width}x${height} (expected 300x150 or 600x300 for high-DPI)`);
            allValid = false;
          }
        } catch (error) {
          console.error(`  ❌ Could not verify ${componentName}.png:`, error.message);
          allValid = false;
        }
      } else {
        console.log(`  ❌ ${componentName}.png - File not found`);
        allValid = false;
      }
    }
    
    if (allValid) {
      console.log('🎉 All screenshots generated successfully!');
    } else {
      console.log('⚠️  Some screenshots may need manual review.');
    }
    
  } catch (error) {
    console.error('❌ Screenshot generation failed:', error);
  } finally {
    await browser.close();
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Screenshot generation interrupted');
  process.exit(0);
});

// Check if development server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/screenshots');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function main() {
  console.log('🔍 Checking if development server is running...');
  
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ Development server not running!');
    console.log('💡 Please start the server first:');
    console.log('   npm run dev');
    console.log('   Then run this script again.');
    process.exit(1);
  }
  
  console.log('✅ Development server is running');
  await generateScreenshots();
}

main().catch(console.error); 