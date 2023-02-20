import { Router } from "express"

import booksRouter from "@modules/books/infra/http/routes/books.routes"

const routes = Router()

routes.use('/books', booksRouter)

export default routes