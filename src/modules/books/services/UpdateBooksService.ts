import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IBooksRepository from '../repositories/IBooksRepository'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

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
    private storageProvider: IStorageProvider
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