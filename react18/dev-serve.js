const CreateWebpackCompiler = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const findFreePort = require('find-free-port')
const pathResolve = require('path').resolve


const {getConfig} = require("./webpack/webpack.config.js")

const argv = process.argv
// const node_fullPath = argv[0]
// const thisFileName = argv[1]
const argv1 = argv[2]

const HOST = '0.0.0.0'
const PORT_LOWER = 38800
const PORT_UPPER = 38810


findFreePort(PORT_LOWER, PORT_UPPER, HOST, function(err, freePort){
  if (err) {
    console.log(err)
    console.log(`Cannot find free port between ${PORT_LOWER}, ${PORT_UPPER}`)
    return
  }
  if (freePort) {
    start(freePort, HOST)
  }
})


function start(port, host) {
  const webpackConfig = getConfig({ pathToEntryFile: './'+argv1 })
  // console.dir(webpackConfig, {depth: 8})

  const webpackCompiler = CreateWebpackCompiler(webpackConfig);
  const devServerOptions = {
    // ...webpackConfig.devServer,
    port: port,
    host: host,
    open: true,
    hot: true, // Dev server client for web socket transport, hot and live reload logic
    client : {
      logging: 'info',
      overlay: { errors: true, warnings: true }
    }
  };

  const server = new WebpackDevServer(devServerOptions, webpackCompiler);

  const runServer = async () => {
    console.log('Starting server...');
    await server.start();
  };

  runServer();
}
