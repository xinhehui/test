const path = require('path');

module.exports = {
    mode: 'production',
    context: path.join(__dirname, 'src'),
    entry: {
        index: './index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
    }
};