const validator = require('validator')

const validate = transaction =>{
    let error ={}
    if(transaction.amount){
        error.amount = 'Please Enter Your Amount'
    }
    if(transaction.type){
        error.type = 'Please Enter Type '
    }


    return {
        error,
        isValid: Object.keys(error).length === 0 
    }
}

module.exports = validate
