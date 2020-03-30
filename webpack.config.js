const path = require('path');
const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modeConfig = mode => require(`./build-utils/webpack.${mode}.js`)(mode);

module.exports = () => {
  return WebpackMerge({
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundler.js'
    },
    mode: process.env.NODE_ENV,
    module: {
      rules: [
       {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(ico|webp|gif|png|jpe?g|svg|woff2?|ttf|otf)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: (path) => {
                  let s = path.split('.');
                  let extension = s[s.length - 1];
                  return (
                    /(woff2?|ttf|otf)$/i.test(extension) ?
                      'fonts/[name].[ext]' : 'images/[name].[ext]'
                  )
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin([
        {
          from: './src/manifest.json',
        },
      ]),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['!*.json', '!*.html'],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ]
  },
    modeConfig(process.env.NODE_ENV)
  );
};