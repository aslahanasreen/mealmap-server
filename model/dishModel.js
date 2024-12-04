const mongoose = require('mongoose')

const dishSchema = mongoose.Schema({
    hotelid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const dishes = mongoose.model('dishes',dishSchema)
module.exports=dishes