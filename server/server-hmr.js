import http from 'http'
import Koa from 'koa'
import path from 'path'
import staticCache from 'koa-static-cache'
import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'

import config from './config'
import { appConfig } from '../webpack.config.app.babel'

const app = new Koa()

const compiler = webpack(appConfig)

app.use(
  devMiddleware(compiler, {
    index: false,
    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 500,
      poll: true
    },
    publicPath: appConfig.output.publicPath,
    stats: {
      colors: true
    },
    timeout: 1000 * 20
  })
)
app.use(
  hotMiddleware(compiler, {
    path: '/__webpack_hmr_app',
    heartbeat: 10 * 1000
  })
)

app.use(
  staticCache(path.join(__dirname, '/public/'), {
    buffer: !config.debug,
    maxAge: config.debug ? 0 : 60 * 60 * 24 * 7
  })
)

const server = http.createServer(app.callback())

server.listen(config.hmrPort)

export {
  server as default
}
