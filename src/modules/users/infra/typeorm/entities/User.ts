import {
	Entity,
	ObjectIdColumn,
	ObjectID,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from 'typeorm'

import { Exclude } from 'class-transformer'

@Entity('users')
export default class User {
	@ObjectIdColumn()
	_id: ObjectID

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	@Exclude()
	password: string

	@Column()
	is_admin?: boolean

	@Column()
	phone: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@DeleteDateColumn()
	deleted_at: Date
}