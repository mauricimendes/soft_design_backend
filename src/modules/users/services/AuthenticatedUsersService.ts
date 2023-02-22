
import auth from '@config/auth'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserRepository from '../repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export default class AuthenticatedUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Incorrect email/password combination.', 401)

    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatched) throw new AppError('Incorrect email/password combination.', 401)

    const { secret, expiresIn } = auth.jwt

    const token = sign({}, secret, {
      subject: String(user._id),
      expiresIn
    })

    return {
      user,
      token
    }
  }
}