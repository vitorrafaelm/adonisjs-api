import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'UserTypesController.store')
    Route.get('/', 'UserTypesController.index')
  }).prefix('/userType')

  Route.group(() => {
    Route.post('/', 'UsersController.createStudent')
    Route.get('/:idContentMaker', 'UsersController.listStudents')
  }).prefix('/users')

  // Only a content maker can creator a course, for that I create a middleare that verify the
  // user truly is a CONTENT MAKER -> .middleware(['identifyUserType'])
  Route.group(() => {
    Route.post('/', 'CoursesController.store')
    Route.get('/:idContentMaker', 'CoursesController.index')
    Route.get('/:idContentMaker/:idCourse', 'CoursesController.show')
    Route.put('/:idContentMaker/:idCourse', 'CoursesController.update')
    Route.delete('/:idContentMaker/:idCourse', 'CoursesController.destroy')
  }).prefix('/courses')

  Route.get('/listCourses/:idStudent/courses', 'CoursesController.listCourses')

  // Rotas para alterar um modulo
  Route.group(() => {
    Route.post('/', 'ModulesController.store')
    Route.get('/:courseId', 'ModulesController.index')
    Route.get('/:courseId/:moduleId', 'ModulesController.show')
    Route.put('/:courseId/:moduleId', 'ModulesController.update')
    Route.delete('/:courseId/:moduleId', 'ModulesController.destroy')
  }).prefix('/modules')

  Route.group(() => {
    Route.post('/', 'LessonsController.store')
    Route.get('/:moduleId', 'LessonsController.index')
    Route.get('/:lessonId/:moduleId', 'LessonsController.show')
    Route.put('/:lessonId/:moduleId', 'LessonsController.update')
    Route.delete('/:lessonId/:moduleId', 'LessonsController.destroy')
  }).prefix('/lessons')

  Route.group(() => {
    Route.post('/', 'AuthenticationController.authenticate')
    Route.delete('/logout', 'AuthenticationController.logout')
  }).prefix('/auth')

  Route.group(() => {
    Route.get('/:creatorId', 'ClassroomsController.index')
    Route.post('/', 'ClassroomsController.store')
    Route.post('/addStudentToClassroom', 'UserClassroomsController.store')
    Route.delete(
      '/deleteStudentFromClassroom/:studentId/:classroomId',
      'UserClassroomsController.destroy'
    )
  }).prefix('/classrooms')
}).prefix('/api')
