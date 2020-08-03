const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');

const webpackProduction = merge(webpackBaseConfig, {
	output: {
		publicPath: process.env.PUBLIC_PATH_PROD,
	},

	mode: 'production',

	devtool: 'source-map',

	cache: false,

	performance: {
		hints: 'error',
		maxAssetSize: 150 * 1024, // 150 KiB
		maxEntrypointSize: 150 * 1024, // 150 KiB
	},

	optimization: {
		minimize: true,

		minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
	},
});

module.exports = webpackProduction;
