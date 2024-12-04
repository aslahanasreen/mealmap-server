const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

const hotel = mongoose.model('hotels',hotelSchema)

module.exports = hotel