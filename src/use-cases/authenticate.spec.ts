import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUserUseCase } from './authenticate'
import { hash } from 'bcrypt'
import { InvalidUserCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
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
    await expect(() =>
      sut.execute({
        email: 'john1@example.com',
        password: '1234567890',
      }),
    ).rejects.toBeInstanceOf(InvalidUserCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
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
