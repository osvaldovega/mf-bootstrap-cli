const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const dependencies = require('../package.json').dependencies;
const mf = require('./moduleFederation');
const {
	APP_DIR,
	BUILD_DIR,
	ASSETS_PATH,
	includePathFromPublic,
	includePathFromAssets,
	includePathFromSrc,
} = require('./paths');

const { ModuleFederationPlugin } = webpack.container;
dotenv.config();

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
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
		alias: {
			components: includePathFromSrc('components'),
			fonts: includePathFromAssets('fonts'),
			images: includePathFromAssets('images'),
			pages: includePathFromSrc('pages'),
			routes: includePathFromSrc('routes'),
			styles: includePathFromSrc('styles'),
		},
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
				test: /\.(js|jsx|ts|tsx)$/,
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
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/fonts/[name]-[contenthash].[ext]',
						},
					},
				],
				include: ASSETS_PATH,
			},
			{
				test: /\.(png|gif|jp(e*)g|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8 * 1024,
							name: 'assets/images/[name]-[contenthash].[ext]',
						},
					},
				],
				include: ASSETS_PATH,
			},
		],
	},

	plugins: [
		new webpack.ProgressPlugin(),

		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: 'static/[name].bundle.css',
			chunkFilename: 'static/[id].bundle.css',
		}),

		new HtmlWebpackPlugin({
			template: includePathFromPublic('index.html'),
			scriptLoading: 'defer',
			title: APP_NAME,
			favicon: includePathFromPublic('favicon.ico'),
			manifest: includePathFromPublic('manifest.json'),
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
