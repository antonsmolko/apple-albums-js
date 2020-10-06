const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function () {
    return {
        optimization: {
            minimizer: [
              // we specify a custom UglifyJsPlugin here to get source maps in production
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                  compress: false,
                  ecma: 6,
                  mangle: true
                },
                sourceMap: true
              })
            ]
        }
    }
};