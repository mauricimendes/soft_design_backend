import FakeRentsRepository from '@modules/rents/repositories/fakes/FakeRentsRepository'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import DeleteBookService from './DeleteBookService'

let fakeBooksRepository: FakeBooksRepository
let fakeUsersRepository: FakeUsersRepository
let fakeRentsRepository: FakeRentsRepository
let fakeStorageProvider: FakeStorageProvider
let deleteBook: DeleteBookService

describe('DeleteBook', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeRentsRepository = new FakeRentsRepository()
    fakeStorageProvider = new FakeStorageProvider

    deleteBook = new DeleteBookService(
      fakeBooksRepository,
      fakeStorageProvider,
      fakeUsersRepository,
      fakeRentsRepository
    )
  })

  it('should be able to delete a book.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
      is_admin: true
    })

    const book = await fakeBooksRepository.create({
      title: 'Harry Potter e a pedra filosofal',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    const deletedBook = await deleteBook.execute(book._id.toString(), user._id.toString())

    expect(deletedBook).toEqual(undefined)
  })

  it('should not be able to delete book when user is not admin.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    const book = await fakeBooksRepository.create({
      title: 'Harry Potter e a pedra filosofal',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: user._id.toString(),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    await expect(
      deleteBook.execute(book._id.toString(), user._id.toString())
    ).rejects.toEqual(new AppError('User is not admin.', 405))
  })
})