const webpack = require("webpack")

const isProduction = process.env.NODE_ENV === "production"

const plugins = []

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
  }))
}

plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: `"${process.env.NODE_ENV}"`,
    },
  })
)

module.exports = {
  devtool: isProduction ? "cheap-module-source-map" : "source-map",
  entry: `${__dirname}/../../src/index.js`,
  plugins,
  output: {
    path: `${__dirname}/../../build`,
    filename: isProduction ? "index.min.js" : "index.js",
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel",
    }, {
      test: /\.css$/,
      loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss",
    }],
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
  },
  postcss: [
    require("autoprefixer"),
    require("postcss-nested"),
  ],
}
