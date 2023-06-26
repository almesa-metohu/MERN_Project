const RoomController = require('../controllers/room.controller')

module.exports = app => {
    app.get('/api/rooms', RoomController.getAllRooms)
    app.get('/api/room/:id', RoomController.getOneRoom)
    app.get('/api/bookRoom/:id/:userId', RoomController.bookRoom)
    app.post('/api/newRoom/:hotelId', RoomController.newRoom)
    app.patch('/api/editRoom/:id', RoomController.editRoom)
    app.delete('/api/deleteRoom/:id/:hotelId', RoomController.deleteRoom)
}