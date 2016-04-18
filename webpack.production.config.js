var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'js', 'app.js');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: [
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.optimize.UglifyJsPlugin({
       compressor: {
         warnings: false
       }
     }),
/*     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production'),
       'process.env.GRAPHQL_PORT': JSON.stringify('8080'),
       'process.env.APP_PORT': JSON.stringify('3000'),
       'process.env.API_PORT': JSON.stringify('3001')
     })*/
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    },{
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};

module.exports = config;
