import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'
import User from '@modules/users/infra/typeorm/entities/User'
import { ObjectId } from 'mongodb'
import IUsersRepository from '../IUsersRepository'

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = new User()
    Object.assign(user, data)
    this.users.push(user)
    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findUser = this.users.find(user => user.email === email)
    return findUser ? findUser : null
  }

  public async findById(id: string): Promise<User | null> {
    const findUser = this.users.find(user => user._id = new ObjectId(id))
    return findUser ? findUser : null
  }
}