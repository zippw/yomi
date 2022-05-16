const webpack = require('webpack');

const webpackConfig = {
    entry: "./app/js/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/app/js/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                options: {
                    compact: true
                }
            }
        ]
    },
    resolve: {
        modules: ['./app/js']
    },
    mode: "production",
    devtool: "source-map"
};

module.exports = webpackConfig;
