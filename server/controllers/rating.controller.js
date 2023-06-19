const Rating = require('../models/rating.model')
const Hotel = require('../models/hotel.model')

module.exports = {
    newRating: (req, res) => {
        Rating.create(req.body)
            .then(rating => {
                Hotel.findOneAndUpdate(
                    {_id: req.params.hotelId},
                    { $push: { ratings: rating._id } },
                    {new: true, runValidators: true}
                )
                    .populate('ratings')
                    .then((updatedHotel ) => {
                        res.status(200).json({ message: 'Rating created', hotel: updatedHotel })
                    })
                    .catch(err => {
                        console.log('Failed to update hotel with rating id' + err)
                        res.json(err)
                    })
            })
            .catch(err => {
                console.log('Failed to create a rating' + err)
                res.json(err)
            })
    },

    getAllRatings: (req, res) => {
        Rating.find()
        .then(rating => res.json(rating))
        .catch(err => res.json(err))
    }
}