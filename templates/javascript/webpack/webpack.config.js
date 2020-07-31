const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const dotenv = require('dotenv');
const deps = require('../package.json').dependencies;

// Import and read .env file
dotenv.config();

// Set paths
const APP_DIR = path.join(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const STATIC_PATH = path.resolve(__dirname, '../assets');

const { APP_NAME, MF_NAME } = process.env;

const webpackBaseConfig = {
	name: APP_NAME,

	entry: {
		app: path.join(APP_DIR, 'index.js'),
	},

	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js',
		uniqueName: APP_NAME,
	},

	resolve: { extensions: ['.js', '.jsx', '.json', '.scss'] },

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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
				use: 'file-loader?name=assets/[name]-[hash].[ext]',
			},
			{
				test: /\.(png|gif|jpg|svg)$/,
				use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
				include: STATIC_PATH,
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
			chunkFilename: '[id].bundle.css',
		}),

		new HtmlWebpackPlugin({
			template: path.join(PUBLIC_PATH, 'index.html'),
			scriptLoading: 'defer',
			title: APP_NAME,
			favicon: path.join(PUBLIC_PATH, 'favicon.ico'),
		}),

		new ModuleFederationPlugin({
			name: MF_NAME,
			library: { type: 'var', name: MF_NAME },
			exposes: {},
			remotes: {},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: deps['react-dom'],
				},
			},
		}),
	],

	optimization: {
		minimize: false,

		runtimeChunk: 'single',

		splitChunks: {
			chunks: 'all',

			name: false,

			cacheGroups: {
				default: false,

				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'async',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true,
				},

				vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					priority: 20,
				},
			},
		},
	},
};

module.exports = webpackBaseConfig;
