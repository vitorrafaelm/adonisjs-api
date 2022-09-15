import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // Router to register student and content maker, a student must have a creatorId
  public async createStudent({ request, response }: HttpContextContract) {
    const { name, username, email, typeId, creatorId } = request.body()

    try {
      const userCreated = await User.create({
        name,
        username,
        email,
        typeId,
        creatorId,
      })

      return response.status(201).json(userCreated)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Content maker can list the students he registered
  public async listStudents({ params, response }: HttpContextContract) {
    const { idContentMaker } = params

    try {
      const contentCreator = await User.query().where('creator_id', idContentMaker)

      return response.status(201).json(contentCreator)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
