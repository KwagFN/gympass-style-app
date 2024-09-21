import { expect, it, describe, beforeEach } from 'vitest'
import { CreateUserUseCase } from './register'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memmory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '1234567890',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '1234567890',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567890',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@email.com'

    await sut.execute({
      name: 'John Doe',
      email: email,
      password: '1234567890',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: email,
        password: '1234567890',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
