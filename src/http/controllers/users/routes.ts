import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { CreateUserController } from './register'
import { AuthenticateUserController } from './authenticate'
import { ProfileController } from './profile'
import { refreshTokenController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', CreateUserController)
  app.post('/sessions', AuthenticateUserController)

  app.patch('/token/refresh', refreshTokenController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
