const path = require('path');
const { BannerPlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const { banner, scriptFilename } = require('./config/info.js');

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: scriptFilename,
        pathinfo: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.sass$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.less'],
    },
    mode: 'production',
    optimization: {
        minimize: false,
    },
    performance: {
        maxAssetSize: 1024 * 1024 * 10,
        maxEntrypointSize: 1024 * 1024 * 10,
    },
    plugins: [
        new BannerPlugin({
            banner: banner,
            raw: true,
        }),
        new VueLoaderPlugin(),
    ],
};

module.exports = config;
