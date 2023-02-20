import { container } from "tsyringe"
import { Request, Response } from "express"
import { instanceToInstance } from "class-transformer"

import CreateBookService from "@modules/books/services/CreateBookService"

export default class BooksController {
    public async store(request: Request, response: Response): Promise<Response> {
        const { title, password } = request.body
        const service = container.resolve(CreateBookService)
        const book = await service.execute({ title, password })

        return response.json(instanceToInstance(book))
    }
}