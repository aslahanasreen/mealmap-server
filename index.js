require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./connection/db')
const route = require('./routes/routes')

const server = express()

server.use(cors())
server.use(express.json())
server.use(route)
server.use('/uploads',express.static('./Uploads'))

const PORT = 3000 || process.env.PORT

server.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})