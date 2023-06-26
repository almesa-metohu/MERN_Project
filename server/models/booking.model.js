const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room' 
    }
}, {timestamps: true})

module.exports = mongoose.model('Booking', BookingSchema)