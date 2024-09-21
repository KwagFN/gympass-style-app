import { expect, it, describe } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memmory-users-repository'
import { AuthenticateUserUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidUserCredentialsError } from './errors/invalid-credentials-error'

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

  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await expect(() =>
      sut.execute({
        email: 'john1@example.com',
        password: '1234567890',
      }),
    ).rejects.toBeInstanceOf(InvalidUserCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('1234567890', 10),
    })

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '12345678901',
      }),
    ).rejects.toBeInstanceOf(InvalidUserCredentialsError)
  })
})
