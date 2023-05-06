const pathResolve = require('path').resolve

const loadFonts = ( opts ) => {

  const absPathToFonts = (opts && opts.absPathToFonts)
  if (!absPathToFonts) throw new Error('Path to fonts required')

  const module = {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash][ext][query]'
        },
        include: absPathToFonts
      },
    ]
  }

  return {
    module
  }
}


module.exports = loadFonts
