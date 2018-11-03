const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Helper vars to refer to each file
const paths = {
  entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
  src: path.resolve(__dirname, 'src', 'client', 'index.html'),
  dest: path.resolve(__dirname, 'public'),
  destHtml: path.resolve(__dirname, 'public', 'index.html'),
  contentBase: path.join(__dirname, 'public'),
};

module.exports = {
  entry: ['babel-polyfill', paths.entry],
  output: {
    filename: 'bundle.js',
    path: paths.dest,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
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
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 2000000, // Bytes..
    maxEntrypointSize: 4000000, // Bytes..
    // assetFilter: function(filename) {
    //     If you would like to, you can exclude file types, names,
    //     etc here by providing an expression.
    //     return true;
    // }
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      '/api': 'http://localhost:3000',
    },
    contentBase: paths.contentBase,
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJsPlugin({
      test: /\.js$/,
    }),
    new HtmlWebPackPlugin({
      template: paths.src,
    }),
  ],
};
