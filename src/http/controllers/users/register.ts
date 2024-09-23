import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'

export async function CreateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      name: z
        .string({
          required_error: 'Name is required',
        })
        .min(2),
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

    const { name, email, password } = registerBodySchema.parse(request.body)

    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
