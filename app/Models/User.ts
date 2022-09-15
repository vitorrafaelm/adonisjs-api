import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'
import UserType from './UserType'
import Classroom from './Classroom'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => User)
  public students: HasMany<typeof User>

  @column()
  public creatorId?: number

  @hasOne(() => UserType)
  public type: HasOne<typeof UserType>

  @column()
  public typeId: number

  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @manyToMany(() => Classroom, {
    localKey: 'id',
    pivotTable: 'user_classrooms',
    pivotRelatedForeignKey: 'classroom_id',
    pivotForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  public classroom: ManyToMany<typeof Classroom>

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public isDeleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
