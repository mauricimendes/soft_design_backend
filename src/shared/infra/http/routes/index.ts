import { Router } from 'express'

import booksRouter from '@modules/books/infra/http/routes/books.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.route'
import rentsRouter from '@modules/rents/infra/http/routes/rents.routes'

const routes = Router()

routes.use('/books', booksRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/rents', rentsRouter)

export default routes