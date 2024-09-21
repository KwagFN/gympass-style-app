import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateUserUseCase } from '@/use-cases/register'
import { PrismaCreateUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

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

    const createUserRepository = new PrismaCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(createUserRepository)

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
