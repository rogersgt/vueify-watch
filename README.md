# vueify-watch
Continuously compile Vue.js files on the fly! 

### About
This dev tool leverages vueify and browserify to allow you to have a "watch" option for vueify. To get started, install vueify-watch
globally using `npm install -g vueify-watch`. In your working directory use the command `vueify-watch app.js index.js` in order to
compile an `app.js` file into a minified `index.js`. 

#### watch.json
In order to watch multiple Vue and JavaScript files from child directories, include a watch.json file. Use the following configuration
to watch files inside of folders named `contact`, `home`, and `login`.

``` bash
{
    "vue": [
        "./contact",
        "./home",
        "./login"
    ]
}
``` 