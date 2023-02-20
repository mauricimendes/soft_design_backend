import IBooksCreateDTO from "../dtos/IBooksCreateDTO"
import Book from "../infra/typeorm/entities/book"

export default interface IBooksRepository {
    create(data: IBooksCreateDTO): Promise<Book>
}