import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'UsersController.createStudent').middleware(['identifyUserType'])
    Route.get('/:idContentMaker', 'UsersController.listStudents').middleware(['identifyUserType'])
  }).prefix('/users')
}).prefix('/api')
