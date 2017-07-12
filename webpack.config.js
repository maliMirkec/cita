const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }],
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
        options: {
          minimize: true
        }
      }, {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'sass-loader',
        options: {
          minimize: true
        }
      }]
    }]
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './gfx/logo/c-line.svg',
      prefix: 'icons-[hash]/',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: false,
      inject: true,
      background: '#c1177a',
      title: 'CiTA',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/404.html',
      filename: '404.html'
    }),
    new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|json|html|css|ico)$/,
			threshold: 0,
			minRatio: 0.8
		})
  ]
};
