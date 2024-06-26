import { resolve } from 'node:path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import TerserPlugin from 'terser-webpack-plugin';
import config from './config/calculatedParameters.js';

export default {
    entry: './src/index.tsx',
    output: {
        path: resolve('dist'),
        filename: config.scriptFilename,
        clean: true,
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
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.vue', '.tsx'],
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: true,
                    mangle: true,
                    format: {
                        beautify: true,
                        comments: (_, { value, type }) => {
                            const isMatch = value => {
                                const RegExpArray = [
                                    /@name/,
                                    /@namespace/,
                                    /@copyright/,
                                    /@version/,
                                    /@description/,
                                    /@icon/,
                                    /@iconURL/,
                                    /@defaulticon/,
                                    /@icon64/,
                                    /@icon64URL/,
                                    /@grant/,
                                    /@author/,
                                    /@homepage/,
                                    /@homepageURL/,
                                    /@website/,
                                    /@source/,
                                    /@antifeature/,
                                    /@require/,
                                    /@resource/,
                                    /@include/,
                                    /@match/,
                                    /@exclude/,
                                    /@run-at/,
                                    /@sandbox/,
                                    /@connect/,
                                    /@noframes/,
                                    /@updateURL/,
                                    /@downloadURL/,
                                    /@supportURL/,
                                    /@webRequest/,
                                    /@unwrap/,
                                ];
                                return RegExpArray.some(reg => reg.test(value));
                            };
                            return value.includes('UserScript==') || (isMatch(value) && type === 'comment1');
                        },
                    },
                },
            }),
        ],
    },
    performance: {
        maxAssetSize: 1024 * 1024 * 4,
        maxEntrypointSize: 1024 * 1024 * 4,
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: config.banner,
            raw: true,
        }),
        new VueLoaderPlugin(),
    ],
};
