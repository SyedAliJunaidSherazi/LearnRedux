const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool:"source-map",
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
      "child_process": false,
      "util": false
    }
  }

};
