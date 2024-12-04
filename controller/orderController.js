const orders = require('../model/orderModel')

exports.addOrder = async (req, res) => {
    try {
        const userid = req.payload
        const { dishName, qty, price, tamount, name, house, landmark, city, pin, mob, status, hotelid, payment } = req.body
        const image = req.file.filename

        const newOrder = new orders({
            dishName, qty, price, tamount, name, house, landmark, city, pin, mob, status, hotelid, image, userid, payment
        })

        await newOrder.save()
        res.status(200).json(newOrder)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getOrdersForUser = async (req, res) => {
    try {
        const userid = req.payload
        const result = await orders.find({ userid, status: { $nin: ["delivered", "cancelled"] }  })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getOrdersForHotel = async (req, res) => {
    try {
        const hotelid = req.payload
        const result = await orders.find({ hotelid, status: { $nin: ["delivered", "cancelled"] } })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        // console.log(status)
        const existing = await orders.findById(id)
        existing.status = status

        await existing.save()
        res.status(200).json(existing)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.orderHistory = async(req,res)=>{
    try {
        const userid = req.payload
        const result = await orders.find({ userid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

