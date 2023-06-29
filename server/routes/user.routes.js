const UserController = require('../controllers/user.controller')

module.exports = app => {
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    app.post('/api/logout', UserController.logout)
    app.get('/api/user', UserController.getUser)
    app.get('/api/users', UserController.getUsers)
    app.put('/api/user/:id', UserController.updateUser)
    app.delete('/api/user/:id', UserController.deleteUser)
}