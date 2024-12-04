const express=require('express')

const userController = require('../controller/userController')
const hotelController = require('../controller/hotelController')
const dishController = require('../controller/dishController')
const menuController = require('../controller/menuController')
const orderController = require('../controller/orderController')
const { createOrder, verifyPayment } = require('../controller/paymentController');

const jwtMiddle= require('../middleware/jwtMiddleware')
const multer = require('../middleware/multerMiddleware')

const route = express.Router()

route.post('/reg',userController.userRegistration)
route.post('/log',userController.userLogin)
route.get('/getuser',userController.getUserDetils)
route.delete('/dlt/:id',userController.dltUser)
route.patch('/changep',jwtMiddle,userController.editProfile)
route.delete('/deactivate',jwtMiddle,userController.deactivate)
route.get('/menuu',userController.getMenuForUser)

route.post('/hlog',hotelController.hotelLogin)
route.post('/addh',multer.single('image'),hotelController.addHotel)
route.get('/geth',hotelController.getHotel)
route.delete('/dlth/:id',hotelController.dltHotel)
route.put('/edith/:id',multer.single('image'),hotelController.editHotel)
route.patch('/edithp',jwtMiddle,multer.single('image'),hotelController.editProfile)
route.patch('/changepass',jwtMiddle,hotelController.changePass)
route.delete('/deactivathotel',jwtMiddle,hotelController.deactivateHotel)

route.post('/addd',jwtMiddle,multer.single('image'),dishController.addDish)
route.get('/getd',jwtMiddle,dishController.getDish)
route.delete('/dltd/:id',dishController.dltDish)
route.put('/editd/:id',jwtMiddle,multer.single('image'),dishController.editDish)
route.get('/getdu',dishController.getDishForUser)
route.get('/gethn',dishController.getHotelName)

route.post('/addm',jwtMiddle,multer.single('image'),menuController.addMenu)
route.get('/getm',jwtMiddle,menuController.viewMenu)
route.delete('/dltm/:id',menuController.dltMenu)

route.post('/addo',jwtMiddle,multer.single('image'),orderController.addOrder)
route.get('/getou',jwtMiddle,orderController.getOrdersForUser)
route.get('/getoh',jwtMiddle,orderController.getOrdersForHotel)
route.patch('/patchs/:id',orderController.changeStatus)
route.get('/getoy',jwtMiddle,orderController.orderHistory)

route.post('/createpay',createOrder)
route.post('/verifypay',verifyPayment)

module.exports=route