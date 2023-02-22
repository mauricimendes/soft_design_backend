import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('rents')
export default class Rent {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  book_id: string

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @Column()
  is_rent: boolean
}