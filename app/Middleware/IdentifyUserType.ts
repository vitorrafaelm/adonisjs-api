import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class IdentifyUserType {
  public async handle({ params, request }: HttpContextContract, next: () => Promise<void>) {
    try {
      const { idUser } = params
      const { type } = request.body()

      const userCreator = await User.findOrFail(idUser)

      if (!(userCreator?.type === 'CONTENT_MAKER' && !(type === 'CONTENT_MAKER'))) {
        throw new Error('You do not have permission to perform this action')
      }

      await next()
    } catch (error) {
      throw new Error('You do not have permission to perform this action')
    }
  }
}
