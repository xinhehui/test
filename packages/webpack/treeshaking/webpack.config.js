const path = require('path');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, '.'),
    entry: {
        sample: './sample/index.js',
        class: './class/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        // filename: '[name].[chunkhash].bundle.js',
        // chunkFilename: '[name].[chunkhash].bundle.js',
        // publicPath: '/',
    },
    devtool: 'source-map'
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    //     runtimeChunk: true,
    // }
};