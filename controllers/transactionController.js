const Transaction = require('../model/Transaction')
const transactionValidator = require('../model/validator/transactionValidator')
const{ serverError,resourceError} = require('../util/error')
const User  = require('../model/User')


module.exports ={

    create(req,res){
      
        // Recived Data form user
        let{amount,type,note,} = req.body
        let userId = req.user._id 

        let validate = transactionValidator(amount,type)

        // User Given data validation Check 

        if(!validate.isValid){
            res.status(400).json(validate.error)

        }
        else{

        let transaction = new  Transaction({
            amount,type, note, author:userId
        })
         
        // Save Data
        transaction.save() 

        .then(trans =>{
            let updateUser = {...req.user._doc}
            if(type==='income'){
                updateUser.balance += amount  
                updateUser.income += amount  
            }
            else if (type === 'expense'){
                updateUser.balance -= amount  
                updateUser.expense += amount 
            }
            
            console.log(updateUser)
            updateUser.transactions.unshift(trans._id)
            User.findByIdAndUpdate(updateUser._id,{ $set:updateUser},{new:true})
                .then(result=>{
                    res.status(201).json({
                        message: 'Transaction Created Successfully',
                        ...trans._doc,
                        user: result
                    })
        
                })
                .catch(error => serverError(res,error))
           
            }
          )

        .catch(error => serverError(res,error))

        }
    },

    getAll(req,res){
        
        // res.status(200).json({
            // message: "Hi"
        // })
        
        let{_id} = req.user
        Transaction.find({author:_id})
        .then(transaction => {
            if(transaction.length ===0){
                res.status(200).json({
                    message:'No transaction Found'
                })
            }
            else{
                res.status(200).json(transaction)
            }
        })
        .catch( error => serverError(res,error))
    },

    getSingleTransaction(req,res){

        let {transactionId} = req.body

        Transaction.findById(transactionId) 

        .then( transaction => {
            if(!transaction){
                res.status(200).json({
                    message: 'No Transaction Found'
                })
            } else{
                res.status(200).json(transaction)
            }
        })
        .catch(error => serverError(res,error))
    },

    update(req, res) {
        let { transactionId } = req.params
        Transaction.findOneAndUpdate({ _id: transactionId }, { $set: req.body }, {new: true})
            .then(result => { 
                res.status(200).json({
                    message: 'Updated Successfully',
                    transaction: result
                })
            })
            .catch(error => serverError(res, error))
    },
    
    remove(req, res) {
        let { transactionId } = req.params
        Transaction.findOneAndDelete({ _id: transactionId })
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(error => serverError(res, error))
    }

}