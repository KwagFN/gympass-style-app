import { prisma } from '@/lib/prisma'
import { PrismaCreateUserRepository } from '@/repositories/prisma-user-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUserUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUserRepository = new PrismaCreateUserRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  })
}
