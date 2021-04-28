const  bcrypt= require('bcrypt')
const User = require('../model/User')
const registerValidator = require('../model/validator/registerValidator')


module.exports = {
    login(req,res) {
        let name  = req.body.name
        let email  = req.body.email

        res.json({
            message:`Welcome ${name} your email is ${email}`
        })
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
                 return res.status(400).json({
                     message:"Email Alredy Exist "
                 })
             }
             bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        message :"Server Error Occurd"
                        })
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
                .catch( error =>{
                    console.log(error);
                    res.status(500).json({
                        message: 'server Error Occourred'
                    })
                })

            

                })

           })

           .catch( error =>{
               console.log(error);
               res.status(500).json({
                   message: 'server Error Occourred'
               })
           })
        }
    }
}