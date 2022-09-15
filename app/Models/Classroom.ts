import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public creatorId: number

  @column()
  public courseId: number

  @column()
  public name: string

  @column()
  public studentsLimit: number

  @column()
  public isDeleted: boolean

  @manyToMany(() => Classroom, {
    localKey: 'id',
    pivotTable: 'user_classrooms',
    pivotRelatedForeignKey: 'user_id',
    pivotForeignKey: 'classroom_id',
    pivotTimestamps: true,
  })
  public students: ManyToMany<typeof Classroom>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
