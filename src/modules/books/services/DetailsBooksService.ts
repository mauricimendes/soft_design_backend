import { inject, injectable } from 'tsyringe'

import Book from '../infra/typeorm/entities/book'
import IBooksRepository from '../repositories/IBooksRepository'

@injectable()
export default class DetailsBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository
  ) { }

  public async execute(id: string): Promise<Book | null> {
    const book = await this.booksRepository.findById(id)
    return book
  }
}