const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin(
    Object.assign({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })
  ),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebPackPlugin({
    template: path.join(__dirname, 'public/index.html'),
  }),
];

module.exports = {
  mode: 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
  },
  entry: {
    index: ['babel-polyfill', path.join(__dirname, 'src/entry/index.dev.js')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  plugins,
  stats: {colors: {green: '\u001b[32m'}},
};
