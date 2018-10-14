import http from 'http'
import Koa from 'koa'
import path from 'path'
import staticCache from 'koa-static-cache'

import config from './config'

const app = new Koa()

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
