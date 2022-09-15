import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Course from 'App/Models/Course'

export default class CoursesController {
  // return the complete list of course the user CONTENT MAKER has.
  public async index({ params, response }: HttpContextContract) {
    const { idContentMaker } = params

    try {
      const courses = await Course.query().where('creator_id', idContentMaker)

      return response.status(200).json(courses)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Search and return just one course
  public async show({ params, response }: HttpContextContract) {
    const { idContentMaker, idCourse } = params

    try {
      const courses = await Course.query()
        .where('id', idCourse)
        .where('creator_id', idContentMaker)
        .limit(1)

      return response.status(200).json(courses)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // Router to creator a course
  public async store({ request, response }: HttpContextContract) {
    const { title, description, creatorId } = request.body()

    try {
      const course = await Course.create({
        title,
        description,
        creatorId,
      })

      return response.status(201).json(course)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // delete one course
  public async destroy({ params, response }: HttpContextContract) {
    const { idContentMaker, idCourse } = params

    try {
      await Course.query()
        .where('id', idCourse)
        .where('creator_id', idContentMaker)
        .limit(1)
        .update('is_deleted', true)

      return response.status(204).json({ message: 'Course was deleted' })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  // update one course
  public async update({ params, request, response }: HttpContextContract) {
    const { idContentMaker, idCourse } = params
    const body = request.body()

    try {
      const [course] = await Course.query()
        .where('id', idCourse)
        .where('creator_id', idContentMaker)
        .limit(1)

      course.title = body.title
      course.description = body.description

      course.save()

      return response.status(204).json({ message: 'Course was deleted' })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  public async listCourses({ params, response }: HttpContextContract) {
    const { idStudent } = params

    try {
      const courses = await Database.rawQuery(
        `
        select
          c2.id as id,
          c2.title as course, 
          c2.description as description
        from users as u 
        join user_classrooms uc on uc.student_id = u.id 
        join classrooms c on c.id = uc.classroom_id 
        join courses c2 on c2.id = c.course_id 
        where u.id = :id 
        `,
        {
          id: parseInt(idStudent),
        }
      )

      return response.status(200).json(courses.rows)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
