const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'This field is required'],
        maxlength: [10, 'Try a shorter title'],
        minlength: [3, 'Title must be longer than 2 characters']
    },
    stars: {
        type: Number,
        max: 5,
        min: 1,
        requiered: [true, 'Stars are required']
    },
    description: {
        type: String,
        maxlength: [150, 'Description must be 150 characters or shorter']
    }
}, {timestamps: true})

module.exports = mongoose.model('Rating', RatingSchema)