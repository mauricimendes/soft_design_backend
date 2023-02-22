import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateRentService from '@modules/rents/services/CreateRentService'
import UpdateFreeBookRentalService from '@modules/rents/services/UpdateFreeBookRentalService'

export default class RentsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const user = request.user

    const createRent = container.resolve(CreateRentService)

    const rent = await createRent.execute({
      book_id: id,
      user_id: user.id
    })

    return response.json(rent)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const updateRent = container.resolve(UpdateFreeBookRentalService)

    await updateRent.execute(id)

    response.statusCode = 200

    return response.json()
  }
}