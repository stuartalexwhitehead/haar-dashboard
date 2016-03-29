require('dotenv').config({
  silent: true,
});

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.resolve(__dirname, 'lib/browser.jsx'),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'lib'),
      ],
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-1', 'react'],
      },
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/js`,
    publicPath: '/js',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin('API__URL', 'APP__URL', 'NODE_ENV'),
  ],
};
