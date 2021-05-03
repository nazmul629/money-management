const router = require('express').Router()
const {login,register,allUsers} = require('../controllers/userControler')

router.post('/register', register)
router.post('/login',login)
router.get('/all',allUsers)



module.exports = router