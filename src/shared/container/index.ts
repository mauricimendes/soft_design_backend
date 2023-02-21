import { container } from 'tsyringe'

import './providers'
import '@modules/users/providers'

import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IBooksRepository>(
	'BooksRepository',
	BooksRepository
)

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)