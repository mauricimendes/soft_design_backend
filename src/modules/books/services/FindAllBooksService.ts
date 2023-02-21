import { inject, injectable } from 'tsyringe'

import Book from '../infra/typeorm/entities/book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class FindAllBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) { }

  public async execute(): Promise<Book[]> {
    const books = await this.booksRepository.findAll()
    return books
  }
}