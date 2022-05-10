const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    // entry for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // bundle output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin to generate html and inject bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate'
      }),
         // Injects our custom service worker(19)
         new InjectManifest({
          swSrc: './src-sw.js',
          swDest: 'src-sw.js',
        }),
        // manifest.json(26)
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Jate-Text-Editor',
        short_name: 'Jate',
        description: 'Just another text editor!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
// 26
    module: {
      // CSS
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
