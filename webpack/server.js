import nodeExternals from 'webpack-node-externals'
import NodemonPlugin from 'nodemon-webpack-plugin'
import path from 'path'

const config = (params) => {
  const { entry, output, mode, rootDir, buildDir } = { output: params.entry, ...params }
  return {
    mode,
    target: 'node',
    entry: {
      server: [
        path.resolve(rootDir, 'server', entry)
      ]
    },
    externals: [nodeExternals()],
    output: {
      path: buildDir,
      filename: output
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' }
          ]
        }
      ]
    },
    plugins: [
      new NodemonPlugin({
        watch: path.resolve('.', 'dist', output),
        ignore: ['*.js.map'],
        verbose: true,
        script: path.resolve('.', 'dist', output)
      })
    ],
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500,
      poll: 1000
    },
    node: {
      __dirname: false
    }
  }
}

const serverConfig = (params) => {
  return config({...params, entry: 'server.js'})
}

const hmrServerConfig = (params) => {
  return config({...params, entry: 'server-hmr.js'})
}

export {
  hmrServerConfig,
  serverConfig
}
