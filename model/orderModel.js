const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    dishName:{
        type:String,
        required:true
    },
    qty:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    tamount:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    house:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    mob:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    hotelid:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const order = mongoose.model('orders',orderSchema)

module.exports=order