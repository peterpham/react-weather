var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

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
                test: /\.less$/, 
                use: [
                    {loader: "style-loader"}, 
                    {loader: "less-loader"}
                ] 
            }
        ]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}