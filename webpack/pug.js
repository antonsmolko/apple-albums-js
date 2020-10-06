const fs = require('fs');

module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: {
                        loader: 'pug-loader',
                        options: {
                            pretty: true
                        }
                    }
                }
            ]
        }
    }
};