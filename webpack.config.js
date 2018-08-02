var path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.jsx",
  mode: 'production',
  output: {
     path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  plugins: [
    // ensure that we get a production build of any dependencies
    // this is primarily for React, where this removes 179KB from the bundle
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    })
]

};
