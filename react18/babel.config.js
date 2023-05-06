const babelConfig = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        // 'targets': '> 0.25%, not dead',  // <-- this will override .browserslistrc
        useBuiltIns: 'usage',
        corejs: '3',
        modules: false,
      },
    ],
    // '@babel/preset-typescript',
  ];

  const plugins = [
    null
  ].filter(Boolean);

  return {
    presets,
    plugins,
  }
}

module.exports = babelConfig
