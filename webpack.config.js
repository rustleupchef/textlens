const path = require('path');

module.exports = {
  entry: './content.js',
  output: {
    filename: 'content.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.worker\.js$/,
        use: {loader: 'worker-loader'}
      },
    ],
  },
  resolve: {
    alias: {

    },
  },
};
