import { Router } from 'express'
import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'
import BooksController from '../controller/booksController'

const booksRouter = Router()
const upload = multer(uploadConfig.multer)

const booksController = new BooksController()

booksRouter.post('/', ensureAuthenticated, upload.array('images'), booksController.store)
booksRouter.get('/', ensureAuthenticated, booksController.show)
booksRouter.get('/:id', ensureAuthenticated, booksController.index)
booksRouter.delete('/:id', ensureAuthenticated, booksController.destroy)
booksRouter.put('/:id', ensureAuthenticated, upload.array('images'), booksController.update)

export default booksRouter