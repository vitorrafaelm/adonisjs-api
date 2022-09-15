import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserType from 'App/Models/UserType'

export default class UserTypesController {
  public async index({ response }: HttpContextContract) {
    try {
      const userTypes = await UserType.query()

      return response.status(200).json(userTypes)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    try {
      const userTypeCreated = await UserType.create({ name })

      return response.status(201).json(userTypeCreated)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
