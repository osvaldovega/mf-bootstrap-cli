const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');

const webpackProduction = merge(webpackBaseConfig, {
	output: {
		publicPath: process.env.PUBLIC_PATH_PROD,
		chunkFilename: '[name].[contenthash].chunk.js',
	},

	mode: 'production',

	devtool: 'source-map',

	cache: false,
});

module.exports = webpackProduction;
