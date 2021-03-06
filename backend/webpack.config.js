const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: "production",
    // mode: "none" mode: "development"
    target: 'node',
    resolve: {
        modules: [path.resolve('./src'), 'node_modules/'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        filename:'bundle.js',
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'build'),
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)?$/, loader: 'ts-loader', exclude: /node_modules/ },
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^hiredis$/),
        new webpack.IgnorePlugin(/^pg-native$/)
    ]
}