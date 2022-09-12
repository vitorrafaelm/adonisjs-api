import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => User)
  public students: HasMany<typeof User>

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public type: 'STUDENT' | 'CONTENT_MAKER'

  @column()
  public idCreator?: number

  @column()
  public isDeleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
