import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

import { Exclude } from 'class-transformer'

@Entity('books')
export default class Book {

	@ObjectIdColumn()
	_id: ObjectID

	@Column()
	title: string

	@Column()
	@Exclude()
	password: string
}