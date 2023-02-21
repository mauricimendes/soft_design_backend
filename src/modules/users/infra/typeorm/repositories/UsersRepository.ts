import { MongoRepository } from "typeorm"
import { ObjectId } from 'mongodb'

import dataSource from "@shared/infra/typeorm/data-source"

import User from "../entities/User"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"
import ICreateUsersDTO from "@modules/users/dtos/ICreateUsersDTO"

export default class UsersRepository implements IUsersRepository {
  private repository: MongoRepository<User>

  constructor() {
    this.repository = dataSource.getMongoRepository(User)
  }

  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = await this.repository.save(data)
    return this.repository.create(user)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        _id: new ObjectId(id)
      }
    });
    return user
  }
}