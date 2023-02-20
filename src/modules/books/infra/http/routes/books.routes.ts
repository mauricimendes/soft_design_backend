import { Router } from 'express'

import BooksController from '../controller/booksController'

const booksRouter = Router()

const booksController = new BooksController()

booksRouter.post('/', booksController.store)

export default booksRouter