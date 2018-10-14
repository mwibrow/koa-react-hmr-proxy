import pkg from '../package.json'
import env from './lib/env'

const config = Object.freeze({
  name: pkg.name,
  version: `v${pkg.version}`,
  development: env.NODE_ENV !== 'production',
  port: 8100,
  hmrPort: 8140
})

export {
  config as default
}
