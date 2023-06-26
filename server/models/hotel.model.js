const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Property name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
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
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    nonSmokingRoom: {
        type: Boolean,
        default: false
    },
    fitnessCentre: {
        type: Boolean,
        default: false
    },
    restaurant: {
        type: Boolean,
        default: false
    },
    freeWifi: {
        type: Boolean,
        default: false
    },
    familyRooms: {
        type: Boolean,
        default: false
    },
    bar: {
        type: Boolean,
        default: false
    },
    breakfast: {
        type: Boolean,
        default: false
    },
    freeParking: {
        type: Boolean,
        default: false
    },
    pool: {
        type: Boolean,
        default: false
    },
    roomService: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Hotel', HotelSchema)