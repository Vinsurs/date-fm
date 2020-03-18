const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/lib/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'date-fm.min.js',
    library: 'dateFm',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
