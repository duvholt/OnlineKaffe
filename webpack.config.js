const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'index.js',
    publicPath : '/',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}],
                'react',
              ],
              plugins: ['transform-object-rest-spread', 'react-hot-loader/babel']
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devServer: {
    hot: true,
  }
};
