import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { CreateGymController } from './create'
import { SearchGymsController } from './search'
import { fetchNearbyGymsController } from './nearby'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', SearchGymsController)
  app.get('/gyms/nearby', fetchNearbyGymsController)

  app.post('/gym', CreateGymController)
}
