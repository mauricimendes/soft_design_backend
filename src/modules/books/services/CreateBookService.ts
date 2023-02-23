import { injectable, inject } from 'tsyringe'

import Book from '../infra/typeorm/entities/Book'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IBooksRepository from '../repositories/IBooksRepository'
import AppError from '@shared/errors/AppError'

interface ICreateRequest {
	title: string
	author: string
	synopsis: string
	number_pages: number
	images: any[]
	user_id: string
}

@injectable()
export default class CreateBookService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: IBooksRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) { }

	public async execute({
		title,
		author,
		synopsis,
		number_pages,
		images,
		user_id
	}: ICreateRequest): Promise<Book> {

		const checkedUserExists = await this.usersRepository.findById(user_id)

		if (!checkedUserExists) throw new AppError('User not found.', 404)
		if (!checkedUserExists.is_admin) throw new AppError('User is not admin.', 405)

		let filesName: string[] = []

		if (images.length < 0) throw new AppError('Images has required', 404)

		images.map(async ({ filename }) => {
			await this.storageProvider.saveFile(filename)
		})

		images.map(({ filename }) => filesName.push(filename))

		images = filesName

		const book = await this.booksRepository.create({
			title,
			author,
			synopsis,
			number_pages,
			images,
			created_by_admin: checkedUserExists._id.toString()
		})
		return book
	}
}