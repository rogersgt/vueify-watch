const exec = require('child_process').exec;
const fs = require('fs');

module.exports = (path,cmd) => {
  fs.watch(path, {encoding: 'buffer'}, (eventType, fileName) => {
    var child = exec(cmd, function(err, stdout, stderr) {
      if (err) {
        console.log('Error compiling vue files in '.red + path + ': ' + err);
      } else {
        console.log('Compiling vue.js files...'.green);
      }
    });
  });
};
