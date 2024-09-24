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

    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidUserCredentialsError) {
      reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
