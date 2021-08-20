
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    mode: 'development',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js", ".json"]
    },
    externals: {
        immutable: 'commonjs2 immutable',
        isobject: 'commonjs2 isobject',
        'kind-of': 'commonjs2 kind-of',
    },
    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"] // 也可以写成presets:['babel-preset-env']
                    }

                },
                exclude: '/node_modules/'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new CleanWebpackPlugin(),
        new UglifyJsPlugin(),
        // keep module.id stable when vender modules does not change
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),

    ],
    optimization: {
        chunkIds: "size",
        // method of generating ids for chunks
        moduleIds: "size",
        // method of generating ids for modules
        mangleExports: "size",
        // rename export names to shorter names
        minimize: true,
      },

};