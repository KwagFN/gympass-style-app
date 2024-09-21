import { FastifyInstance } from 'fastify'
import { CreateUserController } from './controllers/register'
import { AuthenticateUserController } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', CreateUserController)
  app.post('/sessions', AuthenticateUserController)
}
