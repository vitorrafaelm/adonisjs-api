import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'

export default class LessonsController {
  // list all lessons by module.
  public async index({ params, response }: HttpContextContract) {
    const { moduleId } = params

    try {
      const lessons = await Lesson.query().where('module_id', moduleId)

      return response.status(200).json(lessons)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Search and return just one module by course
  public async show({ params, response }: HttpContextContract) {
    const { moduleId, lessonId } = params

    try {
      const lesson = await Lesson.query()
        .where('id', lessonId)
        .where('module_id', moduleId)
        .limit(1)

      return response.status(200).json(lesson)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Create a module for a lesson
  public async store({ request, response }: HttpContextContract) {
    const { title, description, videoLink, moduleId } = request.body()

    const linkRegex = /(youtube|yt)/.exec(videoLink)

    try {
      if (!linkRegex) {
        throw new Error('Video não é o youtube')
      }

      const lesson = await Lesson.create({
        title,
        description,
        moduleId,
        videoLink,
      })

      return response.status(201).json(lesson)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // delete one lesson
  public async destroy({ params, response }: HttpContextContract) {
    const { moduleId, lessonId } = params

    try {
      await Lesson.query()
        .where('id', lessonId)
        .where('module_id', moduleId)
        .limit(1)
        .update('is_deleted', true)

      return response.status(204).json({ message: 'Lesson was deleted' })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // update one lesson
  public async update({ params, request, response }: HttpContextContract) {
    const { lessonId, moduleId } = params
    const body = request.body()

    try {
      const [lesson] = await Lesson.query()
        .where('id', lessonId)
        .where('module_id', moduleId)
        .limit(1)

      lesson.title = body.title
      lesson.description = body.description
      lesson.videoLink = body.videoLink

      lesson.save()

      return response.status(204).json({ message: 'Lesson was updated' })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
