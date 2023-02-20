import { injectable, inject } from 'tsyringe'

import IBooksCreateDTO from '../dtos/IBooksCreateDTO'
import Book from '../infra/typeorm/entities/book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class CreateBookService {
    constructor(
        @inject('BooksRepository')
        private booksRepository: IBooksRepository
    ) { }

    public async execute(data: IBooksCreateDTO): Promise<Book> {
        const book = await this.booksRepository.create(data)
        return book
    }
}