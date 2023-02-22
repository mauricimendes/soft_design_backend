import { ObjectId } from 'mongodb'

import Book from '@modules/books/infra/typeorm/entities/book'
import IBooksRepository from '../IBooksRepository'
import IBooksCreateDTO from '@modules/books/dtos/ICreateBooksDTO'
import IUpdateBooksDTO from '@modules/books/dtos/IUpdateBooksDTO'

export default class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = []

  public async create(data: IBooksCreateDTO): Promise<Book> {
    const book = new Book()
    Object.assign(book, { _id: new ObjectId() }, data)
    this.books.push(book)
    return book
  }

  public async findById(id: string): Promise<Book | null> {
    const findBook = this.books.find(user => user._id = new ObjectId(id))
    return findBook ? findBook : null
  }

  public async delete(id: string): Promise<void> { }

  public async update(id: string, data: IUpdateBooksDTO): Promise<void> { }

  public async findAll(title?: string, author?: string): Promise<Book[]> {
    let books = this.books

    if (title) {
      books = this.books.filter(book => book.title.includes(title))
    }

    if (author) {
      books = this.books.filter(book => book.author.includes(author))
    }

    return books
  }

  public async details(id: string): Promise<Book | null> {
    const books = this.books.find(book => book._id === new ObjectId(id))
    return books ? books : null
  }
}