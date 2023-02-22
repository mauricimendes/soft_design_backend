import { inject, injectable } from 'tsyringe'

import Book from '../infra/typeorm/entities/book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class FindAllBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) { }

  public async execute(title: string): Promise<Book[]> {
    const books = await this.booksRepository.findAll(title)
    return books
  }
}