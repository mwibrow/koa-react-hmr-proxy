import appView from '../views/app'

const app = (ctx) => {
  ctx.status = 200
  ctx.type = 'html'
  ctx.body = appView()
}

export default app
