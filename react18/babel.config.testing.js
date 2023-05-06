// const isTest = String(process.env.NODE_ENV) === 'test'

const babelConfig = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        'debug': false,
        // 'targets': '> 0.25%, not dead',  // <-- this will override .browserslistrc
        'useBuiltIns': 'usage',
        'corejs': 3,
        'modules': 'commonjs'
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];

  const plugins = [
    'babel-plugin-dynamic-import-node'
  ].filter(Boolean);

  return {
    presets,
    plugins,
  }
}

module.exports = babelConfig
