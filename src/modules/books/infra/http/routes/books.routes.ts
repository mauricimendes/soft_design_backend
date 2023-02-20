import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import BooksController from '../controller/booksController'

const booksRouter = Router()
const upload = multer(uploadConfig.multer)

const booksController = new BooksController()

booksRouter.post('/', upload.array('images'), booksController.store)

export default booksRouter