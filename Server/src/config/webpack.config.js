const webpackNodeExternals = require('webpack-node-externals');
const path = require('path');
module.exports = {
    entry: {
        server: "./index.js",
    },
    output: {
        path: path.join(process.cwd(), "/Server/src/api/v1/dist"),
        filename: "bundle.js"
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            test = '/\.js$/',
            exclude = '/node_modules/',
            use = {
                loader: "babel-loader",
            }
        ]
    }
}
