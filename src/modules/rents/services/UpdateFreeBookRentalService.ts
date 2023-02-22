import { injectable, inject } from 'tsyringe'

import IRentsRepository from '../repositories/IRentsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class UpdateFreeBookRentalService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository
  ) { }

  public async execute(book_id: string): Promise<void> {
    const checkedBookIsRent = await this.rentsRepository.verifyRentByBookId(book_id)
    if (!checkedBookIsRent) throw new AppError('Rent is not found.', 404)

    await this.rentsRepository.update(checkedBookIsRent._id.toString(), {
      book_id: checkedBookIsRent.book_id,
      user_id: checkedBookIsRent.user_id,
      is_rent: false
    })
  }
}