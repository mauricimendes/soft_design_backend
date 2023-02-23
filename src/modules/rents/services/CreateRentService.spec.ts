import FakeBooksRepository from '@modules/books/repositories/fakes/FakeBooksRepository'
import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import FakeRentsRepository from '../repositories/fakes/FakeRentsRepository'
import IRentsRepository from '../repositories/IRentsRepository'
import CreateRentService from './CreateRentService'

let fakeRentsRepository: IRentsRepository
let fakeBooksRepository: IBooksRepository
let fakeUsersRepository: IUsersRepository
let createRent: CreateRentService

describe('CreateRents', () => {
  beforeEach(() => {
    fakeRentsRepository = new FakeRentsRepository()
    fakeBooksRepository = new FakeBooksRepository()
    fakeUsersRepository = new FakeUsersRepository()

    createRent = new CreateRentService(
      fakeRentsRepository,
      fakeBooksRepository,
      fakeUsersRepository
    )
  })

  it('should be able to create a new rent.', async () => {
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

    const rent = await createRent.execute({ book_id: String(book._id), user_id: String(user._id) })
    expect(rent).toHaveProperty('_id')
  })
})