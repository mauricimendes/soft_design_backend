import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import RentsController from '../controllers/RentsController'
import { celebrate, Joi, Segments } from 'celebrate'

const rentsRouter = Router()
const rentsController = new RentsController()

rentsRouter.post('/:id', ensureAuthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
}), rentsController.store)

rentsRouter.patch('/:id', ensureAuthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
}), rentsController.update)

export default rentsRouter