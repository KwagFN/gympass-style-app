import { UsersRepository } from '@/repositories/user-repository'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private createUserRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 10)

    const userWithSameEmail = await this.createUserRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.createUserRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
