import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import CreateBooksService from '@modules/books/services/CreateBooksService'
import DeleteBooksService from '@modules/books/services/DeleteBooksService'
import FindAllBooksService from '@modules/books/services/FindAllBooksService'
import DetailsBooksService from '@modules/books/services/DetailsBooksService'

export default class BooksController {
	public async store(request: Request, response: Response): Promise<Response> {
		const { title, author, synopsis, number_pages } = request.body

		const { id } = request.user

		const images = request.files as []

		const createBooks = container.resolve(CreateBooksService)
		const book = await createBooks.execute({ title, author, synopsis, number_pages, images, user_id: id })

		return response.json(instanceToInstance(book))
	}

	public async destroy(request: Request, response: Response): Promise<Response> {
		const user = request.user
		const { id } = request.params

		const deleteBooks = container.resolve(DeleteBooksService)
		await deleteBooks.execute(id, user.id)

		response.statusCode = 200

		return response.json()
	}

	public async show(_: Request, response: Response): Promise<Response> {
		const findBooks = container.resolve(FindAllBooksService)
		const books = await findBooks.execute()

		return response.json(books)
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const findBook = container.resolve(DetailsBooksService)
		const books = await findBook.execute(id)

		return response.json(books)
	}
}