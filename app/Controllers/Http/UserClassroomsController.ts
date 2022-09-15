import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import UserClassroom from 'App/Models/UserClassroom'

export default class UserClassroomsController {
  public async store({ request, response }: HttpContextContract) {
    const { studentId, classroomId } = request.body()

    try {
      const classRoom = await Classroom.findOrFail(classroomId)

      if (classRoom.studentsLimit === 10) {
        const newClassroom = await Classroom.create({
          courseId: classRoom.courseId,
          creatorId: classRoom.creatorId,
          name: `${classRoom.name} + Extra`,
        })

        const userClassroom = await UserClassroom.create({
          classroomId: newClassroom.id,
          studentId,
        })

        return response.status(201).json(userClassroom)
      }

      const userClassroom = await UserClassroom.create({
        classroomId,
        studentId,
      })

      classRoom.studentsLimit = classRoom.studentsLimit + 1
      classRoom.save()

      return response.status(201).json(userClassroom)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { studentId, classroomId } = params

    try {
      await UserClassroom.query()
        .where('student_id', '=', studentId)
        .where('classroom_id', '=', classroomId)
        .delete()

      return response.status(204).json({ message: 'register deleted' })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}
