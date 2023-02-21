import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import ICreateUsersDTO from '../dtos/ICreateUsersDTO'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

@injectable()
export default class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ name, email, password, phone, is_admin }: ICreateUsersDTO): Promise<User> {
    const checkedUsersExistis = await this.usersRepository.findByEmail(email)

    if (checkedUsersExistis) throw new AppError('Email address already used.', 409)

    const hashPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      phone,
      is_admin
    })
    return user
  }
} 