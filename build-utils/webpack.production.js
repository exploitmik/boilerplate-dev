const glob = require('glob');
const path = require('path');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src')
}

module.exports = () => ({
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js',
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/template/*.html`,  { nodir: true }),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin()
    ],
  }
});