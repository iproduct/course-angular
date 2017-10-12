var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  context: helpers.root('src'),
  entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'app': ['./main.ts']
  },

  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.json']
  },

  module: {
    rules: [
      // TypeScript files
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: { limit: 10000 } // Convert images < 10k to base64 strings
      //   }]
      // },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.p?css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              importLoaders: 1
            }
          },
          // {
          //   loader: 'sass-loader'
          // }, 
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  // require('autoprefixer')
                ];
              }
            }
          }]
        })
      },
      {
        test: /\.sass$/,
        include: helpers.root('src', 'app'),
        loader: ['css-to-string-loader','css-loader','sass-loader'] 
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: ['css-to-string-loader','css-loader']
      }
      // {
      //   test: /\.css$/,
      //   include: 'app',
      //   loader: 'raw-loader'
      // },
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //   use: [
      //     'style-loader',
      //     'css-loader?modules',
      //     'postcss-loader',
      //   ],
      // },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills']
    }),
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'React TODO Demo',
      favicon: './favicon.ico'
    })
  ]
};
