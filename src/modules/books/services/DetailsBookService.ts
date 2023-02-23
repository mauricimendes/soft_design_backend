import { inject, injectable } from 'tsyringe'

import Book from '../infra/typeorm/entities/Book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class DetailsBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) { }

  public async execute(id: string): Promise<Book | null> {
    const book = await this.booksRepository.findById(id)
    return book
  }
}