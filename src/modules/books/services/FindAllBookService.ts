import { inject, injectable } from 'tsyringe'

import Book from '../infra/typeorm/entities/Book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class FindAllBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) { }

  public async execute(title?: string, author?: string): Promise<Book[]> {
    const books = await this.booksRepository.findAll(title!, author!)
    return books
  }
}