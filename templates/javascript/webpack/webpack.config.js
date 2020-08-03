const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const dotenv = require('dotenv');
const deps = require('../package.json').dependencies;

const { ModuleFederationPlugin } = webpack.container;
dotenv.config();

const mf = require('./moduleFerderation');

// Set paths
const APP_DIR = path.join(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const STATIC_PATH = path.resolve(__dirname, '../assets');

const { APP_NAME, MF_NAME, ANALYZER } = process.env;

const plugins = [
  new CleanWebpackPlugin(),

  new MiniCssExtractPlugin({
    filename: 'static/styles.css',
    chunkFilename: 'static/styles.[contenthash].css',
  }),

  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_PATH, 'index.html'),
    scriptLoading: 'defer',
    title: APP_NAME,
    favicon: path.join(PUBLIC_PATH, 'favicon.ico'),
    manifest: path.join(PUBLIC_PATH, 'manifest.json'),
  }),

  new HtmlWebpackTagsPlugin({
    append: true,
    tags: mf.remotesURLs,
    publicPath: false,
  }),

  new ModuleFederationPlugin({
    name: MF_NAME,
    library: { type: 'var', name: MF_NAME },
    exposes: mf.exposes,
    remotes: mf.remotes,
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
];

if (ANALYZER === 'true') plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  name: APP_NAME,

  entry: {
    app: path.join(APP_DIR, 'index.js'),
  },

  utput: {
    path: BUILD_DIR,
    filename: 'static/[name].[contenthash].js',
    chunkFilename: 'static/[name].[contenthash].js',
    uniqueName: APP_NAME,
  },

  esolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },

  tats: {
    chunks: true,
    modules: true,
    chunkModules: true,
    chunkRootModules: true,
    chunkOrigins: true,
  },

  odule: {
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
          // MiniCssExtractPlugin.loader, // There is current issue with this plugin  Webpack 5 - https://github.com/webpack-contrib/mini-css-extract-plugin/issues/487
          'style-loader',
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
        use: 'file-loader?name=assets/[name]-[contenthash].[ext]',
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: ['url-loader?limit=20480&name=assets/[name]-[contenthash].[ext]'],
        include: STATIC_PATH,
      },
    ],
  },

  plugins,

  optimization: {
    moduleIds: 'deterministic',

    runtimeChunk: {
      name: 'manifest',
    },

        litChunks: {
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
      },
    },
  },
};
