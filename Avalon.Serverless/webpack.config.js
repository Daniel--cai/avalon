const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  devtool: "source-map",
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
