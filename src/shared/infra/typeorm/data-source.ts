import { DataSource } from 'typeorm'

const dataSource = new DataSource({
	type: "mongodb",
	host: "localhost",
	port: 27017,
	database: "my_books",
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