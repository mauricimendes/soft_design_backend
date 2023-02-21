import { Router } from 'express'

import booksRouter from '@modules/books/infra/http/routes/books.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.route'

const routes = Router()

routes.use('/books', booksRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes