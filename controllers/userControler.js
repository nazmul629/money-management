const  bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const registerValidator = require('../model/validator/registerValidator')
const loginValidator = require('../model/validator/loginValdtor')
const{ serverError,resourceError} = require('../util/error')

module.exports = {
    login(req,res) 
    {
        
        // Recived Data form user
        let  {email,password} = req.body 
        
        // User Given data validation Check 
        let validate = loginValidator({email,password})
        if (!validate.isValid){
            return res.status(400).json(
                validate.error
            )
        }
        // Chaek for user avalabliy

        User.findOne({email})
        .then(user =>{
            if(!user){
                return resourceError(res, 'User Not found ')
            }

            //Compress password
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    return serverError(res, err)
                }
                if(!result){
                    return resourceError(res, "password Doesn\'t Match ")
                }
            //Generate Token and Response Back
            let token = jwt.sign({
                _id : user._id,
                name: user.name,
                email: user.email,
            }, 'SECRET', {expiresIn:'2h'})
            
            res.status(200).json({
                message:"Login Luccess...!!!",
                token:`Bearer ${token}`
            })

          })
        })
        .catch( error =>serverError(res,error))


    },
    

    register(req, res){
        let {name,email,password, confirmPassword} = req.body
        
        let validate = registerValidator({name,email,password, confirmPassword})
        
        if(!validate.isValid){
            res.status(400).json(validate.error)
        }
        else{
           User.findOne({email})
           .then(user =>{
             if(user) {
                 return resourceError(res, 'Email Alredy Exist')
             }
             bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    return resourceError(res, 'Server Error ')

                    }
                
                let user = new User({
                    name,
                    email,
                    password:hash
                })

                user.save()
                .then(user =>{
                    res.status(201).json({
                        message:"user Created SuccessFull",
                        user 
                    })
                })
                .catch( error =>serverError(res,error))

            

                })

           })

           .catch( error => serverError(res,error))
        }
    }
}