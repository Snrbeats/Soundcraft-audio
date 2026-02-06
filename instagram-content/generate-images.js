const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateImages() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const graphicsDir = path.join(__dirname, 'graphics');
    const outputDir = path.join(__dirname, 'output');
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    const htmlFiles = fs.readdirSync(graphicsDir).filter(f => f.endsWith('.html'));
    
    for (const file of htmlFiles) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1080, height: 1080 });
        
        const filePath = path.join(graphicsDir, file);
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
        
        // Wait for fonts to load
        await new Promise(r => setTimeout(r, 1000));
        
        const outputPath = path.join(outputDir, file.replace('.html', '.png'));
        await page.screenshot({ path: outputPath, type: 'png' });
        
        console.log(`Generated: ${outputPath}`);
        await page.close();
    }
    
    await browser.close();
    console.log('Done! Images saved to output/');
}

generateImages().catch(console.error);
