import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import CreateBookService from './CreateBookService'

let fakeBooksRepository: FakeBooksRepository
let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let fakeHashProvider: FakeHashProvider
let createBook: CreateBookService

describe('CreateBook', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository()
    fakeStorageProvider = new FakeStorageProvider()
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createBook = new CreateBookService(
      fakeBooksRepository,
      fakeStorageProvider,
      fakeUsersRepository
    )
  })

  it('should be able to create a new book', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
      is_admin: true
    })

    const book = await createBook.execute({
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      user_id: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('images', ['capa.jpg', 'verso.jpg'])
  })

  it('should not be able to create a book when user is not admin', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
    })

    await expect(createBook.execute({
      title: 'Harry Potter',
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