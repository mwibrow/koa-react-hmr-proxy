import appView from '../views/app'

const app = async (ctx) => {
  ctx.status = 200
  ctx.body = appView()
}

export default app
