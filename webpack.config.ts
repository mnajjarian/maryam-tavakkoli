/* eslint-disable no-undef */
import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        stats: 'errors-only',
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
            { test: /\.(s*)css$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
        ],
    },
};

export default config;
