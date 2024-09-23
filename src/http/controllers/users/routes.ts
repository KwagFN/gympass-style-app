import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { CreateUserController } from './register'
import { AuthenticateUserController } from './authenticate'
import { ProfileController } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', CreateUserController)
  app.post('/sessions', AuthenticateUserController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
