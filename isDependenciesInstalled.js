const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const dependencies = packageJson.dependencies || {};

const nodeModulesPath = path.join(__dirname, 'node_modules');

console.log('Проверка зависимостей:');
for (const dep in dependencies) {
  const depPath = path.join(nodeModulesPath, dep);
  try {
    if (fs.existsSync(depPath)) {
      const installedPackage = require(path.join(depPath, 'package.json'));
      const installedVersion = installedPackage.version;
      console.log(`${dep}: Установлен (версия: ${installedVersion})`);
    } else {
      console.log(`${dep}: НЕ УСТАНОВЛЕН`);
    }
  } catch (e) {
    console.log(`${dep}: НЕ УСТАНОВЛЕН (ошибка: ${e.message})`);
  }
}