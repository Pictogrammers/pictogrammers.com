const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    before: (app) => {
      app.get('/', (req, res, next) => {
        req.url = '/index-new.html';
        next();
      });
    }
  },
  entry: {
    index: './src/index.js',
    brand: './src/pages/brand/brand.js'
  },
  output: {
    filename: '[name].bundle.[contenthash].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/brand/brand.html',
      filename: 'brand-guidelines/index.html',
      chunks: ['brand']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index-new.html',
      chunks: ['index']
    })
  ]
};
