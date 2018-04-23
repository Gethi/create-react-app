const path = require('path');
const fs = require('fs');
const spawn = require('react-dev-utils/crossSpawn');

module.exports = {

  writePackageJson(data) {
    const stringifiedPackageJson = JSON.stringify(data, null, 4);
    return new Promise(
      (resolve,reject)=>{
        fs.writeFileSync(path.resolve(__dirname, '../package.json'), stringifiedPackageJson);
        resolve();
      }
    )
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
    const useYarn = fs.existsSync(path.join(`${__dirname}/../`, 'yarn.lock'));
    let command;
    let args;

    if (useYarn) {
      command = 'yarnpkg';
      args = ['install'];
    } else {
      command = 'npm';
      args = ['install'];
    }

    return new Promise((resolve, reject) => {
      console.log(`Installing dependencies ${command}...`);
      console.log();
      const proc = spawn.sync(command, args, { stdio: 'inherit' });
      if (proc.status !== 0) {
        console.error(`\`${command} ${args.join(' ')}\` failed`);
        reject();
      }
      resolve();
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
