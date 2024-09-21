import { expect, it, describe } from 'vitest'
import { CreateUserUseCase } from './register'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memmory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Create User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)

    const { user } = await createUserUseCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)

    const email = 'john@email.com'

    await createUserUseCase.execute({
      name: 'John Doe',
      email: email,
      password: '1234567890',
    })

    expect(() =>
      createUserUseCase.execute({
        name: 'John Doe',
        email: email,
        password: '1234567890',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
