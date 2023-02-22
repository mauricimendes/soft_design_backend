import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticatedUsersService from './AuthenticatedUsersService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticatedUsersService

describe('CreateUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    authenticateUser = new AuthenticatedUsersService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456789'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '45445646'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'wron-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})