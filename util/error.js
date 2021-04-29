module.exports = {
    serverError(res,error){
        console.log(error);
            res.status(500).json({
            message: 'server Error Occourred'
            })
    },
    resourceError(res,message){
        res.status(400).json({
            message
        })
    }

}