import Rent from '../infra/typeorm/entities/Rent'
import ICreateRentDTO from '../dtos/ICreateRentDTO'
import IUpdateRentDTO from '../dtos/IUpdateRentDTO'

export default interface IRentsRepository {
  create(data: ICreateRentDTO): Promise<Rent>
  verifyRentByBookId(id: string): Promise<Rent | null>
  update(id: string, data: IUpdateRentDTO): Promise<void>
}