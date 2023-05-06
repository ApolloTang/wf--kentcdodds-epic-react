const loadJs_esbuildLoader_n_babelLoader = () => {

  const module = {
    rules: [
      {
        test: /\.m?(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015'
            }
          },
        ],
        exclude: [/node_modules/]
      }
    ]
  }

  return {
    module
  }
}


module.exports = loadJs_esbuildLoader_n_babelLoader
