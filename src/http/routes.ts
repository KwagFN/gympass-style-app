import { FastifyInstance } from 'fastify'
import { CreateUserController } from './controllers/register'
import { AuthenticateUserController } from './controllers/authenticate'
import { ProfileController } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', CreateUserController)
  app.post('/sessions', AuthenticateUserController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
