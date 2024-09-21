import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUserUseCase } from '@/use-cases/authenticate'
import { InvalidUserCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateBodySchema = z.object({
      email: z
        .string({
          required_error: 'E-mail is required.',
        })
        .email({
          message: 'Invalid e-mail.',
        }),
      password: z
        .string({
          required_error: 'Password is required.',
        })
        .min(8),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    await authenticateUserUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof InvalidUserCredentialsError) {
      reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
