const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const rootDir = path.resolve(__dirname, '..');
const cacheDir = path.join(rootDir, '.next/cache');

function cleanCache() {
  console.log('Cleaning Next.js cache...');

  try {
    if (fs.existsSync(cacheDir)) {
      rimraf.sync(cacheDir);
      console.log('Cache directory cleaned successfully.');
    } else {
      console.log('Cache directory does not exist. Nothing to clean.');
    }
  } catch (error) {
    console.error('Error cleaning cache:', error);
    process.exit(1);
  }
}

cleanCache();
