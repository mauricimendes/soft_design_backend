import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import RentsController from '../controllers/RentsController'

const rentsRouter = Router()
const rentsController = new RentsController()

rentsRouter.post('/:id', ensureAuthenticated, rentsController.store)
rentsRouter.patch('/:id', ensureAuthenticated, rentsController.update)

export default rentsRouter