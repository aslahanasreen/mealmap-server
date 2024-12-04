const menu = require('../model/menuModel')

exports.addMenu = async (req, res) => {
    try {
        const hotelid = req.payload
        const image = req.file.filename

        const newMenu = new menu({
            image, hotelid
        })

        await newMenu.save()
        res.status(200).json(newMenu)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.viewMenu = async (req, res) => {
    try {
        const hotelid = req.payload
        const result = await menu.find({ hotelid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.dltMenu = async (req, res) => {
    try {
        const { id } = req.params
        const result = await menu.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}