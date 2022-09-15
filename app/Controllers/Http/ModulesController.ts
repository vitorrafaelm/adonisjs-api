import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Module from 'App/Models/Module'

export default class ModulesController {
  // list all modules by course.
  public async index({ params, response }: HttpContextContract) {
    const { courseId } = params

    try {
      const modules = await Module.query().where('course_id', courseId)

      return response.status(200).json(modules)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Search and return just one module by course
  public async show({ params, response }: HttpContextContract) {
    const { courseId, moduleId } = params

    try {
      const module = await Module.query()
        .where('id', moduleId)
        .where('course_id', courseId)
        .limit(1)

      return response.status(200).json(module)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Create a module for a course
  public async store({ request, response }: HttpContextContract) {
    const { title, description, courseId } = request.body()

    try {
      const module = await Module.create({
        title,
        description,
        courseId,
      })

      return response.status(201).json(module)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // delete one course
  public async destroy({ params, response }: HttpContextContract) {
    const { courseId, moduleId } = params

    try {
      await Module.query()
        .where('id', moduleId)
        .where('course_id', courseId)
        .limit(1)
        .update('is_deleted', true)

      return response.status(204).json({ message: 'Module was deleted' })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // update one course
  public async update({ params, request, response }: HttpContextContract) {
    const { courseId, moduleId } = params
    const body = request.body()

    try {
      const [course] = await Module.query()
        .where('id', moduleId)
        .where('course_id', courseId)
        .limit(1)

      course.title = body.title
      course.description = body.description

      course.save()

      return response.status(204).json({ message: 'Course was deleted' })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
