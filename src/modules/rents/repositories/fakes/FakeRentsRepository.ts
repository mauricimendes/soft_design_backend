import { ObjectId } from 'mongodb'

import Rent from '@modules/rents/infra/typeorm/entities/Rent'
import IRentsRepository from '../IRentsRepository'
import ICreateRentDTO from '@modules/rents/dtos/ICreateRentDTO'
import IUpdateRentDTO from '@modules/rents/dtos/IUpdateRentDTO'

export default class FakeRentsRepository implements IRentsRepository {
  private rents: Rent[] = []

  public async create(data: ICreateRentDTO): Promise<Rent> {
    const rent = new Rent()
    Object.assign(rent, { _id: new ObjectId() }, data)
    this.rents.push(rent)
    console.log(this.rents)
    return rent
  }

  public async verifyRentByBookId(id: string): Promise<Rent | null> {
    const findRent = this.rents.find(rent => rent._id === new ObjectId(id))
    return findRent ? findRent : null
  }

  public async update(id: string, data: IUpdateRentDTO): Promise<void> {

  }
}