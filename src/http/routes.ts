import { FastifyInstance } from 'fastify'
import { CreateUserController } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/', CreateUserController)
}
