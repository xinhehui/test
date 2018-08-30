const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    context: path.join(__dirname, 'src'),
    entry: {
        index: './index.vue',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },        
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    //     runtimeChunk: true,
    // }
};