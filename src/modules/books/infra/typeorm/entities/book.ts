import {
	Entity,
	ObjectID,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from "typeorm"

import { Exclude } from 'class-transformer'

@Entity('books')
export default class Book {

	@ObjectIdColumn()
	_id: ObjectID

	@Column()
	title: string

	@Column()
	author: string

	@Column()
	synopsis: string

	@Column()
	number_page: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@DeleteDateColumn()
	deleted_at: Date

	@Column('string', { array: true })
	images: string[]
}