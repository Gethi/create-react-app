module.exports = {
  scriptsToAdd: {
    "precommit": "lint-staged",
    "build-css": "less-watch-compiler ./src/ ./ --run-once",
    "watch-css": "less-watch-compiler ./src/ ./",
  },
  dependenciesToAdd: {
    "less": "^3.0.1",
    "less-watch-compiler": "^1.11.2"
  },
  rulesToAdd: {
    "lint-staged":{
      "src/**/*.{js,jsx,json,css}": [
        "prettier --single-quote --write",
        "git add"
      ]
    }
  },
  dependenciesToRemove: ['npm']
};
