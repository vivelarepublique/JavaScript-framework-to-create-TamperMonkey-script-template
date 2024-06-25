import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './src/index.tsx',
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
                use: ['css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.sass$/,
                use: ['css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                use: ['css-loader', 'stylus-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.vue', '.tsx'],
    },
    mode: 'development',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './test/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    devServer: {
        static: './dist',
        port: 3367,
        open: true,
    },
};
