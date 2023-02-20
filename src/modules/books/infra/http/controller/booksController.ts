import { container } from "tsyringe"
import { Request, Response } from "express"
import { instanceToInstance } from "class-transformer"

import CreateBookService from "@modules/books/services/CreateBookService"

export default class BooksController {
	public async store(request: Request, response: Response): Promise<Response> {
		const { title, author, synopsis, number_pages } = request.body
		const images = request.files as []

		const service = container.resolve(CreateBookService)
		const book = await service.execute({ title, author, synopsis, number_pages, images })

		return response.json(instanceToInstance(book))
	}
}