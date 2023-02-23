import FakeRentsRepository from '@modules/rents/repositories/fakes/FakeRentsRepository'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import UpdateBooksService from './UpdateBookService'

let fakeBooksRepository: FakeBooksRepository
let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let fakeRentsRepository: FakeRentsRepository
let updateBook: UpdateBooksService

describe('UpdateBook', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository()
    fakeStorageProvider = new FakeStorageProvider()
    fakeUsersRepository = new FakeUsersRepository()
    fakeRentsRepository = new FakeRentsRepository()

    updateBook = new UpdateBooksService(
      fakeBooksRepository,
      fakeUsersRepository,
      fakeStorageProvider,
      fakeRentsRepository
    )
  })

  it('should be able to update a book.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
      is_admin: true
    })

    const book = await fakeBooksRepository.create({
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    expect(await updateBook.execute(String((book)._id), {
      title: 'Harry Potter e a pedra filosofal',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      user_id: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })).toEqual(undefined)
  })

  it('should not be able to create a book when user is not admin.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    const book = await fakeBooksRepository.create({
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    await expect(updateBook.execute(String((book)._id), {
      title: 'Harry Potter e a pedra filosofal',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      user_id: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })).rejects.toEqual(new AppError('User is not admin.', 405))
  })
})