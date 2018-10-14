import connect from 'koa-connect'
import http from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import Router from 'koa-router'
import proxy from 'http-proxy-middleware'

import config from './config'
import appCtrl from './controllers/app'

const app = new Koa()

// Webpack
if (config.development) {
  app.use(connect(proxy(
    `/${config.version}`,
    { target: `http://localhost:${config.hmrPort}` })))
  app.use(connect(proxy(
    '/__webpack_hmr_*',
    { target: `http://localhost:${config.hmrPort}` })))
}

const router = new Router()
router.get('/', appCtrl)

app.use(mount('/', router.middleware()))

const server = http.createServer(app.callback())

server.listen(config.port)

export {
  server as default
}
