#! /usr/bin/env node
const userArgs = process.argv.slice(2);
const fs = require('fs');
const colors = require('colors');
const exec = require('child_process').exec;

const app = userArgs[0];
const build = userArgs[1];

const cmd = 'browserify -t vueify -e ' + app + ' -o ' + build;

const watchFile = (path) => {
  fs.watch(path, {encoding: 'buffer'}, (eventType, fileName) => {
    var child = exec(cmd, function(err, stdout, stderr) {
      if (err) {
        console.log('Error compiling vue files in '.red + path + ': ' + err);
      } else {
        console.log('Compiling vue.js files into '.green + build + '...'.green);
      }
    });
  });
};

if (fs.existsSync('./watch.json')) {

  const watchData = fs.readFileSync('./watch.json');
  const watch = JSON.parse(watchData);

  for (var i = 0; i < watch.vue.length; i++) {
    watchFile(watch.vue[i]);
  }

} else {
  watchFile(app);
}



