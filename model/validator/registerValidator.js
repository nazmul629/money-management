const validator = require('validator')

const validate = user =>{
    let error ={}

    if(!user.name){
        error.name = 'Please Provide your Name '
    }
    if(!user.email){
        error.email = 'Please Provide your Email '
    }else if(!validator.isEmail(user.email)){
        error.message = "Please Provide a Valid email"
    }

     if(!user.password){
        error.password = 'Please Provide your Password '
    } else if(user.password.length<6){
        error.password = 'Password Must be Grater or Equal 6 character'
    }
    if(!user.confirmPassword){
        error.confirmPassword = 'Please Provide your Password Again '
    }else if(user.password !== user.confirmPassword){
        error.confirmPassword = 'Password Does\'n Match'
    }


    return {
        error,
        isValid: Object.keys(error).length === 0 
    }
}

module.exports = validate