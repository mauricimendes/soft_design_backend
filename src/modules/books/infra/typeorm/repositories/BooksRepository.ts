import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'

import dataSource from '@shared/infra/typeorm/data-source'

import Book from "../entities/book"
import IBooksRepository from "@modules/books/repositories/IBooksRepository"
import IBooksCreateDTO from "@modules/books/dtos/ICreateBooksDTO"
import IUpdateBooksDTO from '@modules/books/dtos/IUpdateBooksDTO'

export default class BooksRepository implements IBooksRepository {
	private repository: MongoRepository<Book>

	constructor() {
		this.repository = dataSource.getMongoRepository(Book)
	}

	public async create(data: IBooksCreateDTO): Promise<Book> {
		const book = this.repository.create(data)
		return await this.repository.save(book)
	}

	public async findById(id: string): Promise<Book | null> {
		const book = await this.repository.findOne({ where: { _id: new ObjectId(id) } })
		return book
	}

	public async delete(id: string): Promise<void> {
		await this.repository.delete(id)
	}

	public async update(id: string, data: IUpdateBooksDTO): Promise<void> {
		await this.repository.update(id, data)
	}

	public async findAll(title: string, author: string): Promise<Book[]> {
		const books = await this.repository.find({
			where: {
				title: new RegExp(title),
				author: new RegExp('')
			}
		})
		return books
	}

	public async details(id: string): Promise<Book | null> {
		const book = await this.repository.findOne({ where: { _id: new ObjectId(id) } })
		return book
	}
}