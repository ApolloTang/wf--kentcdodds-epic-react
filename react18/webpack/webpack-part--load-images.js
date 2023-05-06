const loadImages = (opts) => {
  const inlineAssetlimit = (opts && opts.inlineAssetlimit) ||  1 * 1024 // If asset size is less than inlineAssetlimit, injected into the bundle as a Base64-encoded string. */}

  const absPathToFonts = (opts && opts.absPathToFonts) || ''
  if (!absPathToFonts) {
    console.info('[INFO] If you have sgv front type, make sure you pass location of fonts to "part_loadImages({ absPathToFonts })"')
  }

  const module = {
    rules: [
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: inlineAssetlimit
          }
        },
        generator: {
          filename: 'imgs/[name]-[hash][ext][query]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: inlineAssetlimit
          }
        },
        generator: {
          filename: 'svg/[name]-[hash][ext][query]'
        },
        exclude: absPathToFonts ? [absPathToFonts] : []
      },
    ]
  }

  return {
    module
  }
}


module.exports = loadImages
