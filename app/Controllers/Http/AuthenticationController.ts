import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
  public async authenticate({ request }: HttpContextContract) {
    console.log('here')
  }

  public async logout({ request }: HttpContextContract) {
    console.log('here')
  }
}
