import { MongoRepository } from 'typeorm'

import dataSource from '@shared/infra/typeorm/data-source'
import Rent from '../entities/Rent'
import IRentsRepository from '@modules/rents/repositories/IRentsRepository'
import ICreateRentDTO from '@modules/rents/dtos/ICreateRentDTO'
import IUpdateRentDTO from '@modules/rents/dtos/IUpdateRentDTO'

export default class RentsRepository implements IRentsRepository {
  private repository: MongoRepository<Rent>

  constructor() {
    this.repository = dataSource.getMongoRepository(Rent)
  }

  public async create(data: ICreateRentDTO): Promise<Rent> {
    const book = this.repository.create(data)
    return await this.repository.save(book)
  }

  public async verifyRentByBookId(id: string): Promise<Rent | null> {
    const book = await this.repository.findOne({
      where: {
        book_id: id,
        is_rent: true
      }
    })

    return book
  }

  public async update(id: string, data: IUpdateRentDTO): Promise<void> {
    await this.repository.update(id, data)
  }
}