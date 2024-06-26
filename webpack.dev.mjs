import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './src/legacy-index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    configFile: 'tsconfig.app.json',
                    onlyCompileBundledFiles: true,
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
    mode: 'development',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './legacy/index.html',
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
