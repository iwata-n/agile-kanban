const path = require('path')

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'Main.jsx')
  ],
  output: {
    path: path.join(__dirname,'/public'),
    filename: 'bundle.js'
  },
  resolve: {
    // When requiring, you don't need to add these extensions
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
}
