import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import CreateUsersService from '@modules/users/services/CreateUsersService'

export default class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone, is_admin } = request.body

    const createUsers = container.resolve(CreateUsersService)

    const user = await createUsers.execute({
      name,
      email,
      password,
      phone,
      is_admin
    })

    return response.json(instanceToInstance(user))
  }
}