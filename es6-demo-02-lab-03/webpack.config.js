var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './polyfills.js',
    'vendors': './vendors.js',
    'app':'./app/index.js'
  },
  output: {
    filename: '[name].js',
    path: 'dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendors', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
}