import IBooksCreateDTO from "../dtos/ICreateBooksDTO"
import IUpdateBooksDTO from "../dtos/IUpdateBooksDTO"
import Book from "../infra/typeorm/entities/Book"

export default interface IBooksRepository {
	create(data: IBooksCreateDTO): Promise<Book>
	delete(id: string): Promise<void>
	findById(id: string): Promise<Book | null>
	findAll(title: string, author: string): Promise<Book[]>
	details(id: string): Promise<Book | null>
	update(id: string, data: IUpdateBooksDTO): Promise<void>
}