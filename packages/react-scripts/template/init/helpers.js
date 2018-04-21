const path = require('path');
const fs = require('fs-extra');

const npm = require('npm');

module.exports = {

  writePackageJson(data) {
    const stringifiedPackageJson = JSON.stringify(data, null, 4);

    return fs.writeFileSync(path.resolve(__dirname, '../package.json'), stringifiedPackageJson);
  },

  deleteFolderRecursive(pathToFolder) {
    const recursive = (pathToFolder) => {
      if (fs.existsSync(pathToFolder)) {
        fs.readdirSync(pathToFolder).forEach((file) => {
          const curPath = `${pathToFolder}/${file}`;

          if (fs.lstatSync(curPath).isDirectory()) {
            recursive(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });

        fs.rmdirSync(pathToFolder);
      }
    };

    recursive(pathToFolder);
  },

  installPackages() {
    return new Promise((resolve, reject) => {
      npm.load(function(err) {
        // handle errors

        // install module ffi
        npm.commands.install([], function(er, data) {
          if (er) {
            console.error(`Something went wrong while installing packages. Error: ${er}`);
            reject();
          }
          resolve();
        });

        npm.on('log', function(message) {
          // log installation progress
          console.log(message);
        });
      });
    });
  },

  removeIniterDependencies(dependenciesToRemove, packageJson) {
    return new Promise(
      (resolve,reject)=>{
        dependenciesToRemove.forEach((depName) => {
          delete packageJson[depName];
        });
        resolve();
      }
    )
  }
};
