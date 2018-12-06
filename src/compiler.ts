const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import data from './data';

// tslint:disable-next-line:no-any arrow-return-shorthand
export default (config: any) => {
    config.entry = {
        app: config.entry.length > 1 ? config.entry : config.entry[0],
        desktop: config.entry.length > 1 ? [config.entry[0], './src/desktop'] : './src/desktop',
    };

    config.output.filename = '[name].js';

    config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['app', 'commons'],
        }),
    ];

    config.optimization = {
        ...config.optimization,
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                },
            },
        },
        occurrenceOrder: true, // To keep filename consistent between
        // different modes (for example building only)
    };

    return {
        ...config,
        devServer: {
            ...config.devServer,
            proxy: {
                '/ws': 'http://localhost:3001',
            },
            // tslint:disable-next-line:no-any
            after: data,
        },
    };
};