import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should be able to create a new user when is not admin', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('is_admin', undefined)
  })

  it('should be able to create a new user when is admin', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
      is_admin: true
    })

    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('is_admin', true)
  })

  it('should be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    await expect(createUser.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })).rejects.toBeInstanceOf(AppError)
  })
})