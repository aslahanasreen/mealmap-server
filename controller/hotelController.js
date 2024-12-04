const hotels = require('../model/hotelModel')
const jwt = require('jsonwebtoken')

exports.hotelLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json('Invalid data')
        }
        else {
            const existing = await hotels.findOne({ email, password })

            if (existing) {
                const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)
                res.status(200).json({ token, username: existing.username, type:existing.type })
            }
            else {
                res.status(400).json('invalid username/password')
            }
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.addHotel = async (req, res) => {
    try {
        const { name, place, email, username, password, type } = req.body
        const image = req.file.filename

        const newHotel = new hotels({
            name, place, email, username, password, image, type
        })
        await newHotel.save()
        res.status(200).json(newHotel)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.getHotel = async (req, res) => {
    try {
        const result = await hotels.find()
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.deactivateHotel = async (req, res) => {
    try {
        const id = req.payload
        const result = await hotels.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.dltHotel = async (req, res) => {
    try {
        const {id} = req.params
        const result = await hotels.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.editHotel = async (req, res) => {
    try {
        const { id } = req.params

        if (req.file) {
            var image = req.file.filename
            var { name, place, email, username, password, type } = req.body
        }
        else {
            var { name, place, email, username, password, image, type } = req.body
        }

        const existing = await hotels.findById(id)
        existing.name = name
        existing.place = place
        existing.email = email
        existing.username = username
        existing.password = password
        existing.image = image
        existing.type = type

        await existing.save()
        res.status(200).json(existing)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.editProfile = async (req, res) => {
    try {
        const hotelid = req.payload

        if (req.file) {
            var image = req.file.filename
            var { name, place, email, username } = req.body
        }
        else {
            var { name, place, email, username, image } = req.body
        }

        const existing = await hotels.findOne({_id:hotelid})
        existing.name = name
        existing.place = place
        existing.email = email
        existing.username = username
        existing.image = image

        await existing.save()
        res.status(200).json(existing)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.changePass = async (req, res) => {
    try {
        const hotelid = req.payload
        const { password } = req.body

        const existing = await hotels.findOne({_id:hotelid})
        existing.password = password

       await existing.save()
       res.status(200).json(existing)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}