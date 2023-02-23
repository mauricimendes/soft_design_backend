import { DataSource } from 'typeorm'

const dataSource = new DataSource({
	type: 'mongodb',
	host: process.env.APP_DATA_SOURCE_HOST,
	port: Number(process.env.APP_DATA_SOURCE_PORT),
	database: process.env.APP_DATA_SOURCE_DATABASE,
	synchronize: true,
	useUnifiedTopology: true,
	entities: [
		"src/modules/**/infra/typeorm/entities/*.ts"
	],
})

dataSource.initialize().then(_ => {
	console.log('Data Source has been initialized!')
}).catch((err) => {
	console.log('Data Source initialization error', err)
})

export default dataSource