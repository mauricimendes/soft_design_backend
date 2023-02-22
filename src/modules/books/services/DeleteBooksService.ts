import { injectable, inject } from 'tsyringe'

import IBooksRepository from '../repositories/IBooksRepository'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IRentsRepository from '@modules/rents/repositories/IRentsRepository'

@injectable()
export default class DeleteBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository
  ) { }

  public async execute(id: string, user_id: string): Promise<void> {
    const checkedUserExists = await this.usersRepository.findById(user_id)

    if (!checkedUserExists) throw new AppError('User not found.', 404)
    if (!checkedUserExists.is_admin) throw new AppError('User is not admin.', 409)

    const checkedBookExists = await this.booksRepository.findById(id)
    if (!checkedBookExists) throw new AppError('Book not found', 404)

    const checkedBookIsRent = await this.rentsRepository.verifyRentByBookId(id)
    if (checkedBookIsRent) throw new AppError('The book cannot be erased, as it is rented.', 405)

    checkedBookExists.images.map(async (image) => {
      await this.storageProvider.deleteFile(image)
    })

    await this.booksRepository.delete(id)
  }
}