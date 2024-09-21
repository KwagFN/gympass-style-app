import { UsersRepository } from '@/repositories/user-repository'
import { InvalidUserCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcrypt'
import { User } from '@prisma/client'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidUserCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidUserCredentialsError()
    }

    return {
      user,
    }
  }
}
