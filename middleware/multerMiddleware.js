const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`./uploads`)
    },
    filename:(req,file,cb)=>{
        cb(null,`Image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
        cb(null,true)
    } 
    else{
        cb(null,false)
        cb(new Error("Invalid File Format..File shoulb be(png,jpg,jpeg)"))
    }
}

module.exports=multer({
    storage,fileFilter
})