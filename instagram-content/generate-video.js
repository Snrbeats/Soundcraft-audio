const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const baseDir = '/home/ubuntu/projects/audio-business/instagram-content';
const framesDir = path.join(baseDir, 'frames');

async function generateVideo(templateName, outputName, duration = 2, fps = 30) {
  // Clean/create frames directory
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true });
  }
  fs.mkdirSync(framesDir);

  const browser = await puppeteer.launch({ 
    headless: true, 
    args: ['--no-sandbox'] 
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });
  
  const filePath = 'file://' + path.join(baseDir, 'templates', templateName + '.html');
  await page.goto(filePath);
  
  // Wait for page to load
  await new Promise(r => setTimeout(r, 500));
  
  const totalFrames = duration * fps;
  const frameInterval = 1000 / fps;
  
  console.log(`Capturing ${totalFrames} frames for ${templateName}...`);
  
  for (let i = 0; i < totalFrames; i++) {
    const frameNum = String(i).padStart(4, '0');
    await page.screenshot({ 
      path: path.join(framesDir, `frame_${frameNum}.png`) 
    });
    await new Promise(r => setTimeout(r, frameInterval));
    
    if (i % 10 === 0) {
      process.stdout.write(`\rFrame ${i + 1}/${totalFrames}`);
    }
  }
  
  console.log('\nFrames captured, encoding video...');
  
  await browser.close();
  
  // Use ffmpeg to create MP4
  const outputPath = path.join(baseDir, 'output', outputName + '.mp4');
  const ffmpegCmd = `ffmpeg -y -framerate ${fps} -i "${framesDir}/frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 18 "${outputPath}"`;
  
  execSync(ffmpegCmd, { stdio: 'inherit' });
  
  console.log(`Video saved: ${outputPath}`);
  
  // Cleanup frames
  fs.rmSync(framesDir, { recursive: true });
  
  return outputPath;
}

async function main() {
  await generateVideo('reel-before-animated', 'reel-before', 3, 30);
  await generateVideo('reel-after-animated', 'reel-after', 3, 30);
  console.log('Done!');
}

main().catch(console.error);
