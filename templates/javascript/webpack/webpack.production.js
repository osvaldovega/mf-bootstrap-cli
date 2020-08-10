const path = require('path');
const { HashedModuleIdsPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');

const { PUBLIC_PATH_PROD } = process.env;
const APP_DIR = path.join(__dirname, '../src');

const webpackProduction = merge(webpackBaseConfig, {
	entry: {
		app: path.join(APP_DIR, 'index.js'),
	},

	output: {
		filename: 'static/[name].[contenthash].js',
		chunkFilename: 'static/[name].[contenthash].chunk.js',
		publicPath: PUBLIC_PATH_PROD,
	},

	mode: 'production',

	devtool: 'source-map',

	performance: {
		hints: 'error',
		maxAssetSize: 150 * 1024, // 150 KiB
		maxEntrypointSize: 150 * 1024, // 150 KiB
	},

	plugins: [
		new CompressionPlugin({
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8,
		}),

		// new HashedModuleIdsPlugin({
		// 	hashFunction: 'sha256',
		// 	hashDigest: 'hex',
		// 	hashDigestLength: 20,
		// }),
	],

	optimization: {
		minimize: true,

		sideEffects: true,

		concatenateModules: true,

		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					compress: {
						comparisons: false,
					},
					parse: {},
					mangle: true,
					output: {
						comments: false,
						ascii_only: true,
					},
				},
				sourceMap: true,
			}),

			new OptimizeCSSAssetsPlugin(),
		],
	},
});

module.exports = webpackProduction;
