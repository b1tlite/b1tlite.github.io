 const path = require('path')
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    sourceMapFilename: '[name].[contenthash:8].map',
    chunkFilename: '[id].[contenthash:8].js',
    library: {
      name: 'sen',
      type: 'umd',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(glb)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',
  // watch: !!devMode,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    allowedHosts: 'all',
    host: '0.0.0.0',
    compress: true,
    port: 9000,
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // config.devtool = 'source-map'
    config.watch = true
  }

  if (argv.mode === 'production') {
    //...
  }

  return config
}
