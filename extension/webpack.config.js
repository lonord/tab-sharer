const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        options: './src/options.jsx',
        background: './src/background.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: process.env.NODE_ENV || 'development',
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
    module: {
        rules: [
            {
                test: /\.jsx/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                path.resolve(__dirname, "public")
            ]
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.NODE_DEBUG': JSON.stringify(''),
        })
    ]
}