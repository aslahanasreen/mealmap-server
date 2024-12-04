const mongoose = require('mongoose')

const connnectionString = process.env.DB_CONNECTION

mongoose.connect(connnectionString).then((res)=>{
    console.log('Server connected to DataBase!')
}).catch((err)=>{
    console.log(err)
})