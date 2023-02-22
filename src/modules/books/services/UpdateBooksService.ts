import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IBooksRepository from '../repositories/IBooksRepository'
import IRentsRepository from '@modules/rents/repositories/IRentsRepository'
import AppError from '@shared/errors/AppError'

interface IUpdateRequest {
  title: string
  author: string
  synopsis: string
  number_pages: number
  images: any[]
  user_id: string
}

@injectable()
export default class UpdateBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository
  ) { }

  public async execute(id: string, {
    title,
    author,
    number_pages,
    synopsis,
    images,
    user_id
  }: IUpdateRequest): Promise<void> {
    const chekcedUsersExists = await this.usersRepository.findById(user_id)

    if (!chekcedUsersExists) throw new AppError('User not found.', 404)
    if (!chekcedUsersExists.is_admin) throw new AppError('User is not admin.', 409)

    const checkedBookExists = await this.booksRepository.findById(id)
    if (!checkedBookExists) throw new AppError('Book not found.', 404)

    const checkedBookIsRent = await this.rentsRepository.verifyRentByBookId(id)
    if (checkedBookIsRent) throw new AppError('The book cannot be erased, as it is rented.', 405)

    let filesName: string[] = []

    if (images.length > 0) {
      checkedBookExists.images.map(async image => {
        await this.storageProvider.deleteFile(image)
      })

      images.map(async ({ filename }) => {
        await this.storageProvider.saveFile(filename)
      })
    }

    images.map(({ filename }) => filesName.push(filename))

    images = filesName

    await this.booksRepository.update(id, {
      title: title ? title : checkedBookExists.title,
      author: author ? author : checkedBookExists.author,
      synopsis: synopsis ? synopsis : checkedBookExists.synopsis,
      number_pages: number_pages ? number_pages : checkedBookExists.number_pages,
      images: images ? images : checkedBookExists.images
    })
  }
}