const tailwindcss = require('tailwindcss')

const path_tailwindConfig = __dirname + '/tailwind.config.js'

postcss = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { 
      plugins: [
        [
          'tailwindcss', { config: path_tailwindConfig }
        ],
      ]
    }
  }
});

module.exports = postcss;
