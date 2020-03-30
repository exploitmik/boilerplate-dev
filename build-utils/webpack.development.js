const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    }),
  ],
  devtool: 'source-map'
});