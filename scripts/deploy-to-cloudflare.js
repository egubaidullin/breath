const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the output directory
const outputDir = path.resolve(__dirname, '../.vercel/output/static');

// Ensure the _worker.js file is copied to the output directory
function copyWorkerFile() {
  console.log('Copying _worker.js to output directory...');

  const sourceWorkerPath = path.resolve(__dirname, '../_worker.js');
  const destWorkerPath = path.resolve(outputDir, '_worker.js');

  try {
    if (fs.existsSync(sourceWorkerPath)) {
      // Create the output directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Copy the worker file
      fs.copyFileSync(sourceWorkerPath, destWorkerPath);
      console.log('Worker file copied successfully.');
    } else {
      console.error('Source worker file not found:', sourceWorkerPath);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error copying worker file:', error);
    process.exit(1);
  }
}

// Create or update the _headers file to include the nodejs_compat flag
function updateHeaders() {
  console.log('Updating _headers file...');

  const headersPath = path.resolve(outputDir, '_headers');
  const headers = `# Cloudflare Pages Headers
/*
  Cloudflare-Workers: nodejs_compat=true

# Кеширование статических ресурсов
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# Кеширование изображений
/icons/*
  Cache-Control: public, max-age=31536000, immutable

# Кеширование шрифтов
/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# Кеширование других статических файлов
/*.ico
  Cache-Control: public, max-age=86400

/*.png
  Cache-Control: public, max-age=86400

/*.svg
  Cache-Control: public, max-age=86400

/*.json
  Cache-Control: public, max-age=86400
`;

  try {
    fs.writeFileSync(headersPath, headers);
    console.log('Headers file updated successfully.');
  } catch (error) {
    console.error('Error updating headers file:', error);
    process.exit(1);
  }
}

// Update the _redirects file to fix duplicate rules
function updateRedirects() {
  console.log('Updating _redirects file...');

  const redirectsPath = path.resolve(outputDir, '_redirects');
  const redirects = `# Перенаправляем запросы на Next.js
/_next/data/:build/index.json /_next/data/:build/index.json 200
/_next/data/:build/:path*.json /_next/data/:build/:path*.json 200
/* / 200
`;

  try {
    fs.writeFileSync(redirectsPath, redirects);
    console.log('Redirects file updated successfully.');
  } catch (error) {
    console.error('Error updating redirects file:', error);
    process.exit(1);
  }
}

// Run the build process
function runBuild() {
  console.log('Building project for Cloudflare Pages...');

  try {
    // Run the Next.js build
    execSync('npm run pages:build', { stdio: 'inherit' });
    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Error building project:', error);
    process.exit(1);
  }
}

// Main function
function main() {
  console.log('Starting Cloudflare Pages deployment process...');

  // Run the build
  runBuild();

  // Copy the worker file
  copyWorkerFile();

  // Update the headers
  updateHeaders();

  // Update the redirects
  updateRedirects();

  console.log('Deployment preparation completed successfully.');
  console.log('You can now deploy to Cloudflare Pages with: npm run pages:deploy');
}

// Run the main function
main();
