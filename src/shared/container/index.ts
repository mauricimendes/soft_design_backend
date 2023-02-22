import { container } from 'tsyringe'

import './providers'
import '@modules/users/providers'

import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IRentsRepository from '@modules/rents/repositories/IRentsRepository'
import RentsRepository from '@modules/rents/infra/typeorm/repositories/RentsRepository'

container.registerSingleton<IBooksRepository>(
	'BooksRepository',
	BooksRepository
)

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)

container.registerSingleton<IRentsRepository>(
	'RentsRepository',
	RentsRepository
)