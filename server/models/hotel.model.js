const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Property name is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    address: {
        type: String,
        required: [true, 'Exact address is required'],
    },
    distance: {
        type: String,
        required: [true, 'Distance is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room'
    }],
    ratings: {
        type: Number,
        min: 0,
        max: 5,
    },
    photos: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: [true, 'Price is required'],
    }
}, {timestamps: true})

module.exports = mongoose.model('Hotel', HotelSchema)