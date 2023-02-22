import { Router } from 'express'
import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'
import BooksController from '../controller/booksController'
import { celebrate, Joi, Segments } from 'celebrate'

const booksRouter = Router()
const upload = multer(uploadConfig.multer)

const booksController = new BooksController()

booksRouter.post('/', ensureAuthenticated, upload.array('images'), celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    author: Joi.string().required(),
    synopsis: Joi.string().required(),
    number_pages: Joi.number().required(),
    created_by_admin: Joi.string().required(),
  },
}), booksController.store)

booksRouter.get('/', ensureAuthenticated, celebrate({
  [Segments.QUERY]: {
    title: Joi.string(),
    author: Joi.string()
  }
}), booksController.show)

booksRouter.get('/:id', ensureAuthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  }
}), booksController.index)

booksRouter.delete('/:id', ensureAuthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  }
}), booksController.destroy)

booksRouter.put('/:id', ensureAuthenticated, upload.array('images'), celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
  [Segments.BODY]: {
    title: Joi.string().required(),
    author: Joi.string().required(),
    synopsis: Joi.string().required(),
    number_pages: Joi.number().required(),
  }
}), booksController.update)

export default booksRouter