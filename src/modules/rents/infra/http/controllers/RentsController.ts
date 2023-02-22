import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateRentsService from '@modules/rents/services/CreateRentsService'
import UpdateFreeBookRentalService from '@modules/rents/services/UpdateFreeBookRentalService'

export default class RentsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const user = request.user

    const createRents = container.resolve(CreateRentsService)

    const rent = await createRents.execute({
      book_id: id,
      user_id: user.id
    })

    return response.json(rent)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const updateRents = container.resolve(UpdateFreeBookRentalService)

    await updateRents.execute(id)

    response.statusCode = 200

    return response.json()
  }
}