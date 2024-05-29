let mix = require('laravel-mix');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

mix.js('src/js/app.js', 'public/dist')
   .sass('src/css/app.scss', 'public/dist')
   .setPublicPath('public')
   .sourceMaps();

mix.webpackConfig({
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      files: ['src/**/*.*']
    })
  ]
});
