import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import CreateBooksService from '@modules/books/services/CreateBookService'
import DeleteBookService from '@modules/books/services/DeleteBookService'
import FindAllBookService from '@modules/books/services/FindAllBookService'
import DetailsBookService from '@modules/books/services/DetailsBookService'
import UpdateBookService from '@modules/books/services/UpdateBookService'

export default class BooksController {
	public async store(request: Request, response: Response): Promise<Response> {
		const { title, author, synopsis, number_pages } = request.body

		const { id } = request.user

		const images = request.files as []

		const createBook = container.resolve(CreateBooksService)
		const book = await createBook.execute({ title, author, synopsis, number_pages, images, user_id: id })

		return response.json(instanceToInstance(book))
	}

	public async destroy(request: Request, response: Response): Promise<Response> {
		const user = request.user
		const { id } = request.params

		const deleteBook = container.resolve(DeleteBookService)
		await deleteBook.execute(id, user.id)

		response.statusCode = 200

		return response.json()
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { title, author } = request.query

		const findBooks = container.resolve(FindAllBookService)
		const books = await findBooks.execute(String(title), String(author))

		return response.json(books)
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const findBook = container.resolve(DetailsBookService)
		const books = await findBook.execute(id)

		return response.json(books)
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { title, author, synopsis, number_pages } = request.body
		const images = request.files as []
		const user = request.user

		const updateBook = container.resolve(UpdateBookService)

		await updateBook.execute(id, {
			title,
			author,
			synopsis,
			number_pages,
			images,
			user_id: user.id
		})

		response.status(200)

		return response.json()
	}
}