const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDevelopment ? 'bundle.js' : '[contenthash]_bundle.js',
      publicPath: isDevelopment ? 'http://localhost:3000/static/' : '/static/',
    },
    devServer: {
      hot: true,
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      static: [
        {
          directory: path.join(__dirname, '../../staticfiles'), 
          publicPath: '/static/',                      
        },
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin({
      //   template: './public/index.html',
      // }),
      new WebpackManifestPlugin({
        fileName: 'manifest.json', // Generiše manifest.json
        publicPath: '/static/', // Putanja do statičkih fajlova
      }),
    ],
  };
};