const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = function () {
    return {
        plugins: [
            new ExtractTextPlugin('css/[name].css'),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['> 1%', 'last 3 version']
                                        })
                                    ]
                                }
                            },
                            'sass-loader'
                        ],
                        fallback: 'style-loader'
                    })
                }
            ]
        }
    }
};