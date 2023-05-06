const isTest = String(process.env.NODE_ENV) === 'test'

const modulesType = ( isTest ) => {
  switch (true) {
    case (isTest): {
      return 'commonjs'
    }
    default:
      return false
  }
}
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
        'modules': modulesType(isTest)
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];

  const plugins = [
    isTest ? 'babel-plugin-dynamic-import-node' : null
  ].filter(Boolean);

  return {
    presets,
    plugins,
  }
}

module.exports = babelConfig
