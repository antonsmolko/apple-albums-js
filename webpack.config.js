const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = require('./webpack/pug');
const script = require('./webpack/script');
const styles = require('./webpack/styles');
const images = require('./webpack/images');
const svgSprite = require('./webpack/svg-sprite');
const fonts = require('./webpack/fonts');
const devserver = require('./webpack/devserver');

// Store .pug file names in src/ in an array
const pages = fs.readdirSync(path.resolve(__dirname, 'src/pug/pages')).filter(fileName => fileName.endsWith('.pug'));

const commonConfig = merge([
    {
        context: path.resolve(__dirname, 'src'),

        entry: {
            main: './index'
        },

        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'docs'),
        },

        plugins: [
            new webpack.optimize.SplitChunksPlugin({
                name: 'vendor'
            }),

            ...pages.map(page => new HtmlWebpackPlugin({
                filename: '../' + path.parse(page).name + '.html',
                chunks: ['main'],
                template: './pug/pages/' + page
            })),
        ],

        resolve: {
            extensions: ['.js', '.json', '.jsx', '*']
        },
    },
    script(),
    styles(),
    images(),
    svgSprite(),
    fonts(),
    pug()
]);

module.exports = function(env){
    if(env === 'production'){
        return merge([
            {mode: 'production'},
            commonConfig
        ])
    }
    if(env === 'development'){
        commonConfig.watch = true;
        commonConfig.devtool = 'source-map';

        return merge([
            {mode: 'development'},
            commonConfig,
            devserver()
        ])
    }
}