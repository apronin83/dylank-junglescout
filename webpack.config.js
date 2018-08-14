const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', 'babel-polyfill', 'webpack-hot-middleware/client', './index.jsx'],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  output: {
    path: '/',
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|ttf|woff|eot|png)/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
