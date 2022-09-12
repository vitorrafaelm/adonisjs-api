import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async createStudent({ request, response }: HttpContextContract) {
    const { name, username, email, type } = request.body()

    try {
      const userCreated = await User.create({
        name,
        username,
        email,
        type,
      })

      return response.status(201).json(userCreated)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
