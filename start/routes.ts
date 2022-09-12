import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/:idUser', 'UsersController.createStudent').middleware(['identifyUserType'])
  }).prefix('/users')
}).prefix('/api')
