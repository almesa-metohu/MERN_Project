const HotelController = require('../controllers/hotel.controller')
const { verifyAdmin } = require('../config/jwt.config')

module.exports = app => {
    app.get('/api/allListings', HotelController.getAllHotels)
    app.get('/api/hotel/:id', HotelController.getOneHotel)
    app.get('/api/countByCity', HotelController.countByCity)
    app.post('/api/newHotel', verifyAdmin, HotelController.newHotel)
    app.patch('/api/editHotel/:id', verifyAdmin, HotelController.editHotel)
    app.delete('/api/deleteHotel/:id', verifyAdmin, HotelController.deleteHotel)
}