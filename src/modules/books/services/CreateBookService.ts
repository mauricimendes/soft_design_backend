import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

import IBooksCreateDTO from '../dtos/IBooksCreateDTO'
import Book from '../infra/typeorm/entities/book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class CreateBookService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: IBooksRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) { }

	public async execute(data: IBooksCreateDTO): Promise<Book> {

		const { images } = data
		let filesName: any = []

		if (images.length < 0) throw new AppError('Images has required', 404)

		images.map(async ({ filename }) => {
			await this.storageProvider.saveFile(filename)
			filesName.push(filename)
		})

		data.images = filesName

		const book = await this.booksRepository.create(data)
		return book
	}
}