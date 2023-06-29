const Hotel = require('../models/hotel.model')

module.exports = {
    newHotel: (req, res) => {
        Hotel.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    },

    getAllHotels: (req, res) => {
        const { min, max, ...others } = req.query;
        Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 }
        }).limit(parseInt(req.query.limit))
        .populate('rooms')
        .populate('ratings')
        .then(hotel => res.json(hotel))
        .catch(err => res.json(err))
    },

    getOneHotel: (req, res) => {
        Hotel.findOne({_id: req.params.id})
        .populate('rooms')
        .populate('ratings')
        .then(hotel => {
            if(!hotel) {
                return res.status(400).json({error: "Property not found"})
            }
            else{
                res.json(hotel)
            }
        })
        .catch(err => res.json(err))
    },

    editHotel: (req, res) => {
        Hotel.findOne({_id: req.params.id})
            .then(hotel => {
                if(!hotel) {
                    return res.status(400).json({error: "Property not found"})
                }
                hotel.name = req.body.name,
                hotel.location = req.body.location,
                hotel.img = req.body.img
                hotel.nonSmokingRoom = req.body.nonSmokingRoom
                hotel.fitnessCentre = req.body.fitnessCentre
                hotel.restaurant = req.body.restaurant
                hotel.freeWifi = req.body.freeWifi
                hotel.familyRooms = req.body.familyRooms
                hotel.bar = req.body.bar
                hotel.breakfast = req.body.breakfast
                hotel.freeParking = req.body.freeParking
                hotel.pool = req.body.pool
                hotel.roomService = req.body.roomService
                return hotel.save()
            })
            .then(hotel => res.json(hotel))
            .catch(err => res.status(500).json({error: err.errors}))
    },
    
    deleteHotel: (req, res) => {
        Hotel.deleteOne({_id: req.params.id})
            .then(deletedHotel => res.json(deletedHotel))
            .catch(err => res.json(err))
    },

    countByCity: (req, res) => {
        const cities = req.query.cities.split(',')
        Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city }).exec()
            })
        )
            .then((list) => {
                res.status(200).json(list)
            })
            .catch(err => res.json(err))
    },

    
}