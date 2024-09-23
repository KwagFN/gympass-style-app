import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createCheckInController } from './create'
import { validateCheckInController } from './validate'
import { checkInHistoryController } from './history'
import { getUserMetricsController } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', checkInHistoryController)
  app.get('/check-ins/metrics', getUserMetricsController)

  app.post('/gyms/:gymId/check-ins', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
