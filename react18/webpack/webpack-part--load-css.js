const loadCSS = (
  { loaders = [] } = {}
) => {
  // see https://github.com/webpack-contrib/css-loader#importloaders
  const importLoaders = loaders.length

  const module = {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders } },
        ].concat(loaders),
      }
    ]
  }

  return {
    module
  }
}


module.exports = loadCSS
