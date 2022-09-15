import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'

export default class ClassroomsController {
  // List all classroom a content maker has
  public async index({ params, response }: HttpContextContract) {
    const { creatorId } = params

    try {
      const classes = await Classroom.query().where('creator_id', creatorId)

      return response.status(200).json(classes)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Router to creator a course
  public async store({ request, response }: HttpContextContract) {
    const { name, courseId, creatorId } = request.body()

    try {
      const course = await Classroom.create({
        name,
        courseId,
        creatorId,
      })

      return response.status(201).json(course)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
