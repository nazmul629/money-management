const validator = require('validator')

const validate = user =>{
    let error ={}

    if(!user.email){
        error.email = 'Please Provide your Email '
    }else if(!validator.isEmail(user.email)){
        error.message = "Please Provide a Valid email"
    }

     if(!user.password){
        error.password = 'Please Provide your Password '
    } 

    return {
        error,
        isValid: Object.keys(error).length === 0 
    }
}

module.exports = validate