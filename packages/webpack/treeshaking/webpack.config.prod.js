const path = require('path');

module.exports = {
    mode: 'production',
    context: path.join(__dirname, '.'),
    entry: {
        sample: './sample/index.js',
        class: './class/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
        chunkFilename: '[name].min.js',
        publicPath: '/',
    },
    devtool: 'source-map'
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    //     runtimeChunk: true,
    // }
};