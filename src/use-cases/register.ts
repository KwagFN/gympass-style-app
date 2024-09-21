import { UsersRepository } from '@/repositories/user-repository'
import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private createUserRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const password_hash = await hash(password, 10)

    const userWithSameEmail = await this.createUserRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.createUserRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
