import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async createStudent({ request, response }: HttpContextContract) {
    const { name, username, email, type, idCreator } = request.body()

    try {
      const userCreated = await User.create({
        name,
        username,
        email,
        type,
        idCreator,
      })

      return response.status(201).json(userCreated)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  public async listStudents({ params, response }: HttpContextContract) {
    const { idContentMaker } = params

    try {
      const contentCreator = await User.query().where('idCreator', idContentMaker)

      return response.status(201).json(contentCreator)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
