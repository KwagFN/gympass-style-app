import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUserUseCase } from '@/use-cases/register'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    await registerUserUseCase({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    return reply.status(409).send(err)
  }
}
