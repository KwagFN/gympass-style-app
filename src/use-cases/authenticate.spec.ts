import { expect, it, describe } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memmory-users-repository'
import { AuthenticateUserUseCase } from './authenticate'
import { hash } from 'bcrypt'

describe('Authenticate User Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('1234567890', 10),
    })

    const { user } = await sut.execute({
      email: 'john@example.com',
      password: '1234567890',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
