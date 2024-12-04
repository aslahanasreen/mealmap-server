const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    hotelid:{
        type:String,
        required:true
    }
})

const menu = mongoose.model('menus',menuSchema)

module.exports=menu