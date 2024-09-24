import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { CreateGymController } from './create'
import { SearchGymsController } from './search'
import { fetchNearbyGymsController } from './nearby'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', SearchGymsController)
  app.get('/gyms/nearby', fetchNearbyGymsController)

  app.post(
    '/gym',
    { onRequest: [verifyUserRole('ADMIN')] },
    CreateGymController,
  )
}
