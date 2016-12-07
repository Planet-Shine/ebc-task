'use strict';
var NODE_ENV = process.env.NODE_ENV || 'development';
var path = require('path');
var projectRootPath = path.resolve(__dirname, './');

var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../public/dist');


//var CleanPlugin = require('clean-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool      : 'source-map',
    context      : path.resolve(__dirname, '.'),
    entry        : {
        'main' : [
            './src/client.js'
        ]
    },
    watch        : true,
    watchOptions : {
        aggrigateTimeout : 300
    },
    output       : {
        filename : path.normalize('./static/build.js'),
        library : 'todo'
    },
    module       : {
        loaders  : [{
            test   : /\.jsx?$/,
            loader : 'babel-loader',
            query: {
                presets: ["react", "es2015", "stage-0"],
                plugins: [
                    // "transform-runtime",
                    // // "add-module-exports",
                    "transform-decorators-legacy",
                    // "transform-react-display-name"
                ]
            }
        }]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        /*
        new CleanPlugin([assetsPath], { root: projectRootPath }),

        // css files from the extract-text-plugin loader
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },

            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
        */
    ]
};