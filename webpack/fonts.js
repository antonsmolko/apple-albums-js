const path = require('path');

module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                publicPath: '/',
                                name: 'assets/[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        }
    }
};