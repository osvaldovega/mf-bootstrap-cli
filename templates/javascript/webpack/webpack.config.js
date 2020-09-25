const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');
const { dependencies } = require('../package.json');
const mf = require('./moduleFederation');
const {
  APP_DIR,
  BUILD_DIR,
  includePathFromPublic,
  includePathFromAssets,
  includePathFromSrc,
} = require('./paths');

const { ModuleFederationPlugin } = webpack.container;
dotenv.config();

// eslint-disable-next-line camelcase
const { APP_NAME, MF_NAME, npm_package_config_analyze } = process.env;
// eslint-disable-next-line camelcase
const extraPlugins = npm_package_config_analyze === 'true' ? [new BundleAnalyzerPlugin()] : [];

module.exports = {
  name: APP_NAME,

  output: {
    uniqueName: APP_NAME,
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    path: BUILD_DIR,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
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
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' },
        include: APP_DIR,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [APP_DIR],
      },
      {
        test: /\.s(a|c)ss$/,
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
        include: [includePathFromAssets('fonts')],
        exclude: [includePathFromAssets('images')],
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
        include: [includePathFromAssets('images')],
        exclude: [includePathFromAssets('fonts')],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].[contenthash].css',
    }),

    new OptimizeCSSAssetsPlugin(),

    new HtmlWebpackPlugin({
      template: includePathFromPublic('index.html'),
      scriptLoading: 'defer',
      title: APP_NAME,
      favicon: includePathFromPublic('favicon.ico'),
      manifest: includePathFromPublic('manifest.json'),
    }),

    new ModuleFederationPlugin({
      name: MF_NAME,
      filename: 'js/remoteEntry.js',
      exposes: mf.exposes,
      remotes: mf.remotes,
      shared: dependencies,
    }),

    ...extraPlugins,
  ],

  optimization: {
    moduleIds: 'deterministic',

    splitChunks: {
      chunks: 'async',
      minSize: 20 * 1024,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50 * 1024,

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
