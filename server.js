const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./routers/userRouter')



const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/api/users',userRouter)
app.get('/',(req,res) =>{
    res.json({
        message: "Welcome to Our Applications"
    })
} )

const PORT  = process.env.PORT || 4000 
app.listen(PORT,() =>{
    console.log(`SERVER is  RUNING ON PORT ${PORT}`);
    mongoose.connect('mongodb+srv://nazmul1234:nazmul1234@cluster0.qrxzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser:true },()=>{
        console.log("Database Connected.....")
    })
})