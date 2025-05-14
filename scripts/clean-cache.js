const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const cacheDir = path.join(rootDir, '.next/cache');

function cleanCache() {
  console.log('Cleaning Next.js cache...');

  try {
    if (fs.existsSync(cacheDir)) {
      // Используем встроенные команды для удаления директории
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${cacheDir}"`, { stdio: 'inherit' });
      } else {
        execSync(`rm -rf "${cacheDir}"`, { stdio: 'inherit' });
      }
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
