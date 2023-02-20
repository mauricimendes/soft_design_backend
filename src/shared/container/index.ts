import { container } from "tsyringe"

import './providers/StorageProvider'

import IBooksRepository from "@modules/books/repositories/IBooksRepository"
import BooksRepository from "@modules/books/infra/typeorm/repositories/BooksRepository"

container.registerSingleton<IBooksRepository>(
    'BooksRepository',
    BooksRepository
)