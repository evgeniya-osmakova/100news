const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/build'),
    filename: 'result.js',
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader', 'svgo-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
