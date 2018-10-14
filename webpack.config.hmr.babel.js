import path from 'path'

import webConfig from './server/config'
import { hmrServerConfig as serverWebpackConfig } from './webpack/server'

import pkg from './package.json'

const distDirName = 'dist'
const dirnameIsDistDir = path.resolve(__dirname).endsWith(distDirName)
const rootDir = dirnameIsDistDir
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname)

const PKG_NAME = pkg.name
const PKG_VERSION = `v${pkg.version}`

const buildDir = path.resolve(rootDir, 'dist')
const publicDir = path.resolve(buildDir, 'public', PKG_VERSION)

const production = process.env.NODE_ENV === 'production'

const params = {
  rootDir,
  buildDir,
  publicDir,
  production,
  mode: production ? 'production' : 'development',
  version: PKG_VERSION,
  name: PKG_NAME,
  publicUrl: `http://0.0.0.0:${webConfig.port}/`
}

const serverConfig = serverWebpackConfig(params)

const config = [
  serverConfig
]

export {
  config as default,
  serverConfig
}
