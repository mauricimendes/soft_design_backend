import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import FindAllBookService from './FindAllBookService'

let fakeBooksRepository: FakeBooksRepository
let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let findAll: FindAllBookService

describe('FindAllBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    findAll = new FindAllBookService(
      fakeBooksRepository
    )
  })

  it('should be able to list the books without filters', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
      is_admin: true
    })

    const book1 = await fakeBooksRepository.create({
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

    const book2 = await fakeBooksRepository.create({
      title: 'Harry Potter e a câmara secreta',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    const book3 = await fakeBooksRepository.create({
      title: 'Harry Potter e o prisioneiro de Azkaban',
      author: 'J.K. Rowling',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    const books = await findAll.execute()

    expect(books).toEqual([book1, book2, book3])
  })

  it('should be able to list the books with filters', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      phone: '(99) 12345-6789',
      password: '123456789',
      is_admin: true
    })

    const book1 = await fakeBooksRepository.create({
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

    const book2 = await fakeBooksRepository.create({
      title: 'Revolução dos bichos',
      author: 'George Orwell',
      number_pages: 206,
      synopsis: 'Synopsis of book and your descriptions',
      created_by_admin: String(user._id),
      images: [
        { filename: 'capa.jpg' },
        { filename: 'verso.jpg' }
      ]
    })

    const books = await findAll.execute('Harry')

    expect(books).toEqual([book1])
  })

})