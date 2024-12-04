const users = require('../model/userModel')
const jwt = require('jsonwebtoken')
const hotel = require('../model/hotelModel')
const menu = require('../model/menuModel')

exports.userRegistration = async (req, res) => {
    try {
        console.log(req.body)
        const { email, username, password, type } = req.body

        if (!email || !username || !password) {
            res.status(400).json('Invalid Input')
        }
        else {
            const newUser = new users({
                email, username, password, type
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json('Invalid Data')
        }
        else {
            let existing = await users.findOne({ email, password })
            if (existing) {
                const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)
                res.status(200).json({ token, username: existing.username, type: existing.type, email })
            }
            if (!existing) {
                existing = await hotel.findOne({ email, password })
                if (existing) {
                    const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)
                    res.status(200).json({ token, username: existing.username, type: existing.type, email, password, place: existing.place, image: existing.image, name: existing.name })
                }
            }
            if (!existing) {
                res.status(400).json('Invalid username/password')
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getUserDetils = async (req, res) => {
    try {
        const result = await users.find({ _id: { $ne: '673dc48751ecf642806c55ea' } })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.dltUser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await users.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.deactivate = async (req, res) => {
    try {
        const userid = req.payload
        const result = await users.findOneAndDelete({ _id: userid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.editProfile = async (req, res) => {
    try {
        const userid = req.payload
        const { username, email } = req.body

        const existing = await users.findOne({ _id: userid })
        existing.username = username
        existing.email = email

        await existing.save()
        res.status(200).json(existing)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getMenuForUser = async (req, res) => {
    try {
        const id = req.query.hid
        console.log(id)

        const result = await menu.find({ hotelid: id })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}