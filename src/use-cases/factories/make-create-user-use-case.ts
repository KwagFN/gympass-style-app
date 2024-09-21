import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserUseCase } from '../register'

export function makeCreateUserUseCase() {
  const createUserRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(createUserRepository)

  return createUserUseCase
}
