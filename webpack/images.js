module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: [
                        /src\/img\/sprite\/.+\.svg$/,
                        /dist\/assets\/img\/sprite\/.+\.svg$/,
                    ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                publicPath: '/',
                                name: 'assets/[path][name].[ext]'
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                progressive: true,
                                quality: 90
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                enabled: false,
                                },
                                pngquant: {
                                quality: '65-90',
                                speed: 4
                                },
                                gifsicle: {
                                interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                quality: 75
                                },
                                
                            }
                        },
                    ],
                }
            ]
        }
    }
};