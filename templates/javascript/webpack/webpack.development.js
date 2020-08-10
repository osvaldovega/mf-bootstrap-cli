const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const webpackBaseConfig = require('./webpack.config');

const { PORT, HOST } = process.env;
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.join(__dirname, '../src');

const webpackDevelopment = merge(webpackBaseConfig, {
	entry: {
		app: ['core-js/stable', 'regenerator-runtime/runtime', path.join(APP_DIR, 'index.js')],
	},

	// Don't use hashes in dev mode for better performance
	output: {
		filename: 'static/[name].js',
		chunkFilename: 'static/[name].chunk.js',
		publicPath: `http://${HOST}:${PORT}/`,
	},

	mode: 'development',

	devtool: 'cheap-module-source-map',

	cache: {
		type: 'memory',
	},

	performance: {
		hints: false,
	},

	devServer: {
		historyApiFallback: true,
		contentBase: BUILD_DIR,
		hot: true,
		port: PORT,
		host: HOST,
		compress: true,
	},

	plugins: [
		new webpack.ProgressPlugin(),

		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

		new webpack.HotModuleReplacementPlugin(),

		new CircularDependencyPlugin({
			exclude: /a\.js|node_modules/,
			failOnError: false,
		}),
	],
});

module.exports = webpackDevelopment;
