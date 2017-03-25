#! /usr/bin/env node
const userArgs = process.argv.slice(2);
const fs = require('fs');
const colors = require('colors');
const watchFile = require('./library/watch');

// ============ Input Output Files / No watch.json ============== //
if (userArgs[0] && userArgs[1]) {

  const app = userArgs[0];
  const build = userArgs[1];
  const cmd = 'browserify -t vueify -e ' + app + ' -o ' + build;

  watchFile(app,cmd);

// ================ watch.json Included / No Arguments ========== //
} else if (fs.existsSync('./watch.json')) {

  if (userArgs[0]) {
    console.log('vueify-watch error: ');
    console.log('Do not specify file path arguments with a watch.json file.'.red);
  } else {
    
    const watchData = fs.readFileSync('./watch.json');
    const watch = JSON.parse(watchData);
    let output = 'index.js';

    if (watch.output) output = watch.output;

    for (var i = 0; i < watch.vue.length; i++) {
      const cmd = 'browserify -t vueify -e ' + watch.main + ' -o' + output;
      watchFile(watch.vue[i],cmd);
    }
  }

// ========================= Error =============================== //
} else {
  console.log('vueify-watch error: ');
  console.log('Please include a watch.json file OR an Input file and an Output file.'.red);
  console.log('Use: ' + 'vueify-watch main.js index.js'.cyan);
  console.log('Or use: ' + 'vueify-watch'.cyan + ' with a watch.json configuration.');
}
