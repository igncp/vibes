const webpack = require("webpack")

const isProduction = process.env.NODE_ENV === "production"

const plugins = []

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
  }))
}
const filename = isProduction ? "index.min.js" : "index.js"
const devtool = isProduction ? "cheap-module-source-map" : "source-map"

module.exports = {
  devtool,
  entry: `${__dirname}/../../src/index.js`,
  plugins,
  output: {
    path: `${__dirname}/../../dist`,
    filename,
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel",
    }],
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
  },
}
