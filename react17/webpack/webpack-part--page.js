const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')

const page = ({title}) => {
  const out = {
    plugins: [
      new MiniHtmlWebpackPlugin( {context: { title }} )
    ]
  }
  return out
}

module.exports = page

