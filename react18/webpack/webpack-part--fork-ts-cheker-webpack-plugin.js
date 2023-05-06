const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const forkTsCheckerWebpackPlugin = ({
  absPathToTsConfig
}) => {

  const plugins = [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: absPathToTsConfig,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ];

  return {
    plugins,
  };
};

module.exports = forkTsCheckerWebpackPlugin;
