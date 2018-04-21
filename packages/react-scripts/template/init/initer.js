const {
  scriptsToAdd,
  dependenciesToAdd,
  dependenciesToRemove,
  rulesToAdd
} = require('./config');

const {
  askForToken,
  writePackageJson,
  deleteFolderRecursive,
  addTokenToNpmrc,
  installPackages,
  removeIniterDependencies
} = require('./helpers');

let packageJson = require('../package.json');
packageJson.scripts = { ...packageJson.scripts, ...scriptsToAdd };
packageJson.dependencies = { ...packageJson.dependencies, ...dependenciesToAdd };
for(rule in rulesToAdd) {
  packageJson[rule] = rulesToAdd[rule];
}

askForToken()
  .then(addTokenToNpmrc)
  .then(installPackages)
  .then(removeIniterDependencies.bind(null, dependenciesToRemove, packageJson))
  .then(writePackageJson.bind(null, packageJson))
  .then(installPackages)
  .then(deleteFolderRecursive.bind(null, __dirname));
