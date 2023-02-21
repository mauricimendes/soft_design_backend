import IBooksCreateDTO from "../dtos/IBooksCreateDTO"
import Book from "../infra/typeorm/entities/book"

export default interface IBooksRepository {
    create(data: IBooksCreateDTO): Promise<Book>
    delete(id: string): Promise<void>
    findById(id: string): Promise<Book | null>
    findAll(): Promise<Book[]>
    details(id: string): Promise<Book | null>
}