import path from 'path';
import webpack from 'webpack';
import OfflinePlugin from 'offline-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    entry: {
        'vendor': [
            'react',
            'react-dom',
            'react-router'
        ],
        'client': path.resolve(__dirname, '../init/', 'client.js'),
        'main': path.resolve(__dirname, '../stylesheets', 'global.scss')
    },

    output: {
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/dist/'
    },

    resolve: {
        modules: [
            'client',
            'common',
            'node_modules'
        ],
        alias: {
            'components': path.resolve(__dirname, '../components')
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            }
        }),
        new CopyWebpackPlugin([{
            context: './src/',
            from: 'images/**/*'
        }]),
        new HtmlWebpackPlugin({
            filename: '../src/views/layout/partials/embeds.hbs',
            template: 'src/views/layout/partials/embeds.template.html',
            inject: false,
            genFileText: '<!-- This is a generated file -->'
        }),
        new OfflinePlugin()
    ],

    node: {
        fs: 'empty'
    }
};