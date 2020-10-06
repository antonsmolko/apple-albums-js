const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = function () {
    return {
        plugins: [
            new SpriteLoaderPlugin({ plainSprite: true })
        ],
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    exclude: [
                        /src\/img\/svg\/.+\.svg$/,
                        /dist\/assets\/img\/svg\/.+\.svg$/,
                    ],
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                spriteFilename: svgPath => `assets/img/sprite/sprite${svgPath.substr(-4)}`
                            }
                        },
                        'svg-fill-loader',
                        'svgo-loader'
                    ]
                }
            ]
        }
    }
};