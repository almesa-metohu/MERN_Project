const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room' 
    },
    checkIn: { 
        type: Date, 
        required: [true, 'Check-in date is required'] 
    },
    checkOut: { 
        type: Date, 
        required: [true, 'Check-out date is required'] 
    },
}, {timestamps: true})

module.exports = mongoose.model('Booking', BookingSchema)