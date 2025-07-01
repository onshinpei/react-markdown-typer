// scripts/set-tag.js
const { version } = require('../package.json');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
// 如果当前分支是main，则设置tag为latest，否则设置为beta

const currentBranch = execSync('git branch --show-current').toString().trim();

const packagePath = path.join(__dirname, '../package.json');
const packageData = require(packagePath);

if (currentBranch === 'main') {
  packageData.publishConfig = { tag: 'latest' };
  // 如果读取到版本号位 0.0.7-beta.x，则latest版本号设置为0.0.7
  // 0.0.7-beta.x -> 0.0.7
  if (version.includes('beta')) {
    packageData.version = version.split('-')[0];
  } else {
    packageData.version = version.split('.')[0] + '.' + parseInt(version.split('.')[1]) + '.' + (parseInt(version.split('.')[2]) + 1);
  }
} else {
  packageData.publishConfig = { tag: 'beta' };

  if (version.includes('beta')) {
    // 如果读取到版本号位 0.0.7-beta.0，则beta版本号设置为0.0.8-beta.1
    packageData.version = version.split('-')[0] + '-beta.' + (parseInt(version.split('-')[1].split('.')[1]) + 1);
  } else {
    // 如果读取到版本号位 0.0.7，则beta版本号设置为0.0.8-beta.0
    packageData.version = version.split('.')[0] + '.' + parseInt(version.split('.')[1]) + '.' + (parseInt(version.split('.')[2]) + 1) + '-beta.0';
  }
}

fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
