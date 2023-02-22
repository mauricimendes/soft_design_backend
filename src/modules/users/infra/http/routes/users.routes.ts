import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import UsersController from '../controllers/UsersController'

const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    is_admin: Joi.bool(),
  }
}), usersController.store)

export default usersRouter