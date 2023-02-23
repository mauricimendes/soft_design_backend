import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import DetailsBookService from './DetailsBookService'

let fakeBooksRepository: FakeBooksRepository
let fakeUsersRepository: FakeUsersRepository
let details: DetailsBookService

describe('FindAllBooks', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository()
    fakeUsersRepository = new FakeUsersRepository()

    details = new DetailsBookService(
      fakeBooksRepository
    )
  })

  it('should be able to show details a book.', async () => {
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

    const book = await details.execute(book1._id.toString())

    expect(book).toEqual(book1)
  })
})