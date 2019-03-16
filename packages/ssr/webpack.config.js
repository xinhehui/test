const serverConfig = {
  target: 'node',
  entry: {
    page1: './web/render/serverRouter.js',
  },
  resolve,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './app/build'),
    libraryTarget: 'commonjs'
  }
 }

 const clientConfig = {
  entry: {
    page1: './web/render/clientRouter.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public')
  }
}
