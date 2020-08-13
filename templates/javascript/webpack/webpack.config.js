const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const dependencies = require('../package.json').dependencies;

const { ModuleFederationPlugin } = webpack.container;
dotenv.config();

const mf = require('./moduleFerderation');

// Set paths
const APP_DIR = path.join(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const STATIC_PATH = path.resolve(__dirname, '../assets');

// eslint-disable-next-line camelcase
const { APP_NAME, MF_NAME, NODE_ENV, npm_package_config_analyze } = process.env;
// eslint-disable-next-line camelcase
const extraPlugins = npm_package_config_analyze === 'true' ? [new BundleAnalyzerPlugin()] : [];

module.exports = {
	name: APP_NAME,

	output: {
		path: BUILD_DIR,
		uniqueName: APP_NAME,
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json', '.scss'],
	},

	stats: {
		chunks: true,
		modules: false,
		chunkModules: false,
		chunkRootModules: true,
		chunkOrigins: true,
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: APP_DIR,
				use: { loader: 'babel-loader' },
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					// {
					// 	loader: MiniCssExtractPlugin.loader, // There is current issue with this plugin  Webpack 5 - https://github.com/webpack-contrib/mini-css-extract-plugin/issues/487
					// 	// enable HMR only in dev
					// 	options: {
					// 		hmr: NODE_ENV === 'development',
					// 	},
					// },
					{
						loader: 'css-loader',
						options: {
							modules: { localIdentName: '[local]___[hash:base64:5]' },
							importLoaders: 1,
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
				use: 'file-loader?name=assets/[name]-[contenthash].[ext]',
			},
			{
				test: /\.(png|gif|jpg|svg)$/,
				use: ['url-loader?limit=20480&name=assets/[name]-[contenthash].[ext]'],
				include: STATIC_PATH,
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: 'static/[name].bundle.css',
			chunkFilename: 'static/[id].bundle.css',
		}),

		new HtmlWebpackPlugin({
			template: path.join(PUBLIC_PATH, 'index.html'),
			scriptLoading: 'defer',
			title: APP_NAME,
			favicon: path.join(PUBLIC_PATH, 'favicon.ico'),
			manifest: path.join(PUBLIC_PATH, 'manifest.json'),
		}),

		new ModuleFederationPlugin({
			name: MF_NAME,
			filename: 'remoteEntry.js',
			exposes: mf.exposes,
			remotes: mf.remotes,
			shared: dependencies,
		}),

		...extraPlugins,
	],

	optimization: {
		moduleIds: 'deterministic',

		splitChunks: {
			cacheGroups: {
				default: false,

				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'async',
					reuseExistingChunk: true,
					enforce: true,
				},

				common: {
					name: 'common',
					test: /[\\/]src[\\/]/,
					chunks: 'async',
					minSize: 0,
					enforce: true,
				},

				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
};
