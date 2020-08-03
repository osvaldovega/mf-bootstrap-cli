const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const { PORT, HOST } = process.env;

const webpackDevelopment = merge(webpackBaseConfig, {
	output: {
		publicPath: `http://${HOST}:${PORT}/`,
	},

	mode: 'development',

	devtool: 'cheap-module-source-map',

	cache: true,

	devServer: {
		historyApiFallback: true,
		contentBase: BUILD_DIR,
		hot: true,
		port: PORT,
		host: HOST,
	},

	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

		new webpack.HotModuleReplacementPlugin(),
	],
});

module.exports = webpackDevelopment;
