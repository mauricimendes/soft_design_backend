import { injectable, inject } from 'tsyringe'

import Rent from '../infra/typeorm/entities/Rent'
import IRentsRepository from '../repositories/IRentsRepository'
import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

interface ICreateRequest {
  book_id: string
  user_id: string
}

@injectable()
export default class CreateRentsService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('BooksRepository')
    private booksRepository: IBooksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ book_id, user_id }: ICreateRequest): Promise<Rent> {
    const checkedUserExists = await this.usersRepository.findById(user_id)
    if (!checkedUserExists) throw new AppError('User not found.', 404)

    const checkedBooksExists = await this.booksRepository.findById(book_id)
    if (!checkedBooksExists) throw new AppError('Book not found.', 404)

    const verifyBookIsRent = await this.rentsRepository.verifyRentByBookId(book_id)
    if (verifyBookIsRent) throw new AppError('Books is already rented.', 409)

    const rent = await this.rentsRepository.create({
      book_id,
      user_id,
      is_rent: true
    })

    return rent
  }
}