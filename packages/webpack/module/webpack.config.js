const path = require('path');
const MyPlugin = require('./src/MyPlugin.js')

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new MyPlugin()
  ]
};