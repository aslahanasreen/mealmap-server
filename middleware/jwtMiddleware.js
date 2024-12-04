const jwt=require('jsonwebtoken')

const jwtmiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const result=jwt.verify(token,process.env.SECRET_KEY)
        console.log(result)
        req.payload=result.userId
        next()
    
    }
    catch(err){
        res.status(400).json
        (err)
    }
}

module.exports=jwtmiddleware