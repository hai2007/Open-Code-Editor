const QuickPaperLoaderPlugin = require('quick-paper/loader-plug/index.js');

module.exports = {
    entry: ['./web/entry.js'],
    output: {
        path: __dirname,
        filename: 'web/dist/main.js',
        chunkFilename: 'web/dist/bundle.[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'image2d': require('path').resolve(__dirname, 'web/plug/image2D.js')
        }
    },
    module: {
        rules: [{
            test: /\.paper$/,
            loader: ['quick-paper/loader/index.js'],
            exclude: /node_modules/
        }, {
            test: /\.(css|scss)$/,
            loader: ['quick-paper/style-loader/index.js', 'css-loader', 'postcss-loader', './scss-loader.js']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            loader: [{
                loader: "url-loader",
                options: {
                    name: "web/dist/[name].[ext]",
                    context: "web/assets",
                    limit: 500000000
                }
            }]
        }]
    },
    plugins: [
        new QuickPaperLoaderPlugin()
    ]
};
