const {
  scriptsToAdd,
  dependenciesToAdd,
  dependenciesToRemove,
  rulesToAdd
} = require('./config');

const {
  writePackageJson,
  deleteFolderRecursive,
  installPackages,
  removeIniterDependencies
} = require('./helpers');

let packageJson = require('../package.json');
packageJson.scripts = { ...packageJson.scripts, ...scriptsToAdd };
packageJson.dependencies = { ...packageJson.dependencies, ...dependenciesToAdd };
for(rule in rulesToAdd) {
  packageJson[rule] = rulesToAdd[rule];
}

installPackages()
  .then(removeIniterDependencies.bind(null, dependenciesToRemove, packageJson))
  .then(writePackageJson.bind(null, packageJson))
  .then(installPackages)
  .then(deleteFolderRecursive.bind(null, __dirname));
