const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: './src/js/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use:  [
                {
                  loader: MiniCssExtractPlugin.loader
                }, 
                {
                  loader: "css-loader",
                },
                {
                  loader: "postcss-loader"
                },
                {
                  loader: "sass-loader",
                }
              ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use:  [
                {
                  loader: "file-loader",
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images'
                  }
                }
              ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use:  [
                {
                  loader: "file-loader",
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts'
                  }
                }
              ]
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `src/index.html`,
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: `src/assets/images`, to: './assets/images' },
    ]),
  ],

  mode: 'development'
};