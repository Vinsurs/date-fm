const pathLib = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: pathLib.resolve(__dirname, "dist"),
    filename: "date-fm.js",
    library: "dateFm",
    globalObject: "this",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules|bower_components/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "source-map"
};
