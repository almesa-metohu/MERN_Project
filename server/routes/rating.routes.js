const RatingController = require('../controllers/rating.controller')

module.exports = app => {
    app.get('/api/ratings', RatingController.getAllRatings)
    app.post('/api/newRating/:hotelId', RatingController.newRating)
}