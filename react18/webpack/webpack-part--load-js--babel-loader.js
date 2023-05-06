const loadJs_BabelLoader = () => {

  const module = {
    rules: [
      {
        test: /\.m?(j|t)s$/,
        use: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  }

  return {
    module
  }
}


module.exports = loadJs_BabelLoader
