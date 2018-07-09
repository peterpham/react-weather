const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const parentDir = path.join(__dirname, '../');
const bundleExtractPlugin = new ExtractTextPlugin({
    filename: './bundle.css',
    allChunks: true
});

module.exports = {
    entry: [
        path.join(parentDir, 'src/index.js')
    ],
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                use: 'babel-loader' 
            },
            { 
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: bundleExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            }
        ]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    },
    plugins: [
        bundleExtractPlugin
    ]
}