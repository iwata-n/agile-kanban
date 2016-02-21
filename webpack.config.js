const path = require('path')

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'jsx', 'Main.jsx')
  ],
  output: {
    path: path.join(__dirname, '/public'),
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
      }
    ]
  },
  plugins: [
    function () {
      this.plugin('watch-run', (watching, callback) => {
        console.log('\033[36m' + 'Begin compile at ' + new Date() + ' \033[39m')
        callback()
      })
    }
  ]
}
