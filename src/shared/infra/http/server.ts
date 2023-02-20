import 'reflect-metadata'

import express, { Response, NextFunction, Request } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import 'express-async-errors'

import AppError from '../../errors/AppError'
import routes from './routes'

import '@shared/infra/typeorm/data-source'
import '@shared/container'
import upload from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json());
app.use('/files', express.static(upload.uploadsFolder))
app.use(routes)
app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message
		})
	}

	console.log(err)

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})

app.listen(3000, () => {
	console.log('Server Working!')
})
