import { InvalidUserCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case'
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

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

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
