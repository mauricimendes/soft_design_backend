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

  public async delete(id: string): Promise<void> {
    this.books.map(book => book._id !== new ObjectId(id))
  }

  public async update(id: string, data: IUpdateBooksDTO): Promise<void> {
    const update = this.books.map(book => {
      if (book._id === new ObjectId(id)) {
        book = {
          _id: new ObjectId(id),
          author: String(data.author),
          images: data.images ? data.images : book.images,
          number_pages: Number(data.number_pages),
          synopsis: String(data.synopsis),
          title: String(data.title),
          created_by_admin: book.created_by_admin,
          created_at: book.created_at,
          updated_at: book.updated_at,
          deleted_at: book.deleted_at,
          getImagesUrl: () => []
        }
      }
      return book
    })
    this.books = update
  }

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