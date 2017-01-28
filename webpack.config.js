var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/snake.js',
  output: {
    path: BUILD_DIR,
    publicPath: "build/",
    filename: 'snake.js'
  },
    module: {
      loaders:[
          {
            test: /\.jsx?$/,
            include : APP_DIR,
            loader : 'babel',
            query: {
                presets: ['es2015', 'react']
            }
          },
          {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: __dirname
             }
        ]
    }
};

module.exports = config;