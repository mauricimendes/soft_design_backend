import upload from "@config/upload"
import { Expose } from "class-transformer"
import {
	Entity,
	ObjectID,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from "typeorm"

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
	number_pages: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@DeleteDateColumn()
	deleted_at: Date

	@Column('string', { array: true })
	images: string[]

	@Column()
	created_by_admin: string

	@Expose({ name: 'images_url' })
	getImagesUrl(): string[] {
		switch (upload.driver) {
			case 'disk':
				return this.images.map(image => `${process.env.APP_API_URL}/files/${image}`)
			default:
				return []
		}
	}
}