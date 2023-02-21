import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticatedUserService from '@modules/users/services/AuthenticatedUsersService'
import { instanceToInstance } from 'class-transformer'

export default class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticatedUser = container.resolve(AuthenticatedUserService)

    const { user, token } = await authenticatedUser.execute({
      email,
      password
    })

    return response.json({ user: instanceToInstance(user), token })
  }
}