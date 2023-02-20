import { MongoRepository } from 'typeorm'

import Book from "../entities/book"
import IBooksRepository from "@modules/books/repositories/IBooksRepository"
import IBooksCreateDTO from "@modules/books/dtos/IBooksCreateDTO"
import dataSource from '@shared/infra/typeorm/data-source'

export default class BooksRepository implements IBooksRepository {
    private repository: MongoRepository<Book>

    constructor() {
        this.repository = dataSource.getMongoRepository(Book)
    }

    public async create(data: IBooksCreateDTO): Promise<Book> {
        const book = await this.repository.save(data)
        return book
    }
}