const dishes = require('../model/dishModel')
const hotel = require('../model/hotelModel')

exports.addDish = async (req, res) => {
    try {
        const hotelid = req.payload
        const image = req.file.filename
        const { name, price, type, category, cuisine, description } = req.body

        const newDish = new dishes({
            hotelid, name, price, type, category, cuisine, image, description
        })
        await newDish.save()
        res.status(200).json(newDish)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getDish = async (req, res) => {
    try {
        const hotelid = req.payload
        const result = await dishes.find({ hotelid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}

exports.dltDish = async (req, res) => {
    try {
        const { id } = req.params
        const result = await dishes.findOneAndDelete({ _id: id })

        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.editDish = async (req, res) => {
    try {
        const { id } = req.params

        if (req.file) {
            var image = req.file.filename
            var { name, price, type, category, cuisine, description } = req.body
        }
        else {
            var { name, price, type, category, cuisine, image, description } = req.body
        }

        const existing = await dishes.findById(id)
        existing.name = name
        existing.price = price
        existing.type = type
        existing.category = category
        existing.cuisine = cuisine
        existing.image = image
        existing.description = description

        await existing.save()
        res.status(200).json(existing)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getDishForUser = async (req, res) => {
    try {
        const search = req.query.search
        const result = await dishes.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { type: { $regex: search, $options: 'i' } },
                        { cuisine: { $regex: search, $options: 'i' } },
                        { category: { $regex: search, $options: 'i' } }
                    ]
                }
            },
            {
                $addFields: {
                    convertedHotelId: { $toObjectId: "$hotelid" } // Convert hotelId to ObjectId
                }
            },
            {
                $lookup: {
                    from: "hotels", // Name of the hotels collection
                    localField: "convertedHotelId", // Field in dishes collection
                    foreignField: "_id", // Field in hotels collection
                    as: "hotelDetails" // Alias for the joined data
                }
            },
            {
                $unwind: "$hotelDetails" // Flatten the hotelDetails array
            }
        ])
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getHotelName = async (req, res) => {
    try {
        const hotelid = req.query.hid
        console.log(hotelid)
        const result = await hotel.findById(hotelid)
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}