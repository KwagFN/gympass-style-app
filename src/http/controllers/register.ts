import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateUserUseCase } from '@/use-cases/register'
import { PrismaCreateUserRepository } from '@/repositories/prisma/prisma-user-repository'

export async function CreateUserController(
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

    const createUserRepository = new PrismaCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(createUserRepository)

    await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    return reply.status(409).send(err)
  }
}
