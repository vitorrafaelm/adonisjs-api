import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class IdentifyUserType {
  public async handle({ request, params }: HttpContextContract, next: () => Promise<void>) {
    try {
      const { idCreator } = request.body()
      const { idContentMaker } = params

      const userCreator = await User.findOrFail(idCreator || idContentMaker)

      if (!(userCreator?.type === 'CONTENT_MAKER')) {
        throw new Error('You do not have permission to perform this action')
      }

      await next()
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
