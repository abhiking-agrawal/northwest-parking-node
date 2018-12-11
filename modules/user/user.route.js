const express = require('express')
const router = express.Router()
const usercontroller = require('./controllers/user.controller')
const auth = require('../core/middleware')

router.get('/all', usercontroller.getallusers)

router.get('/getone/:id', usercontroller.getonebyid)

router.post('/create', usercontroller.createuser)

router.get('/delete/:id', usercontroller.deleteuser)

router.post('/edit/:id', usercontroller.updateuser)

router.post('/login', usercontroller.login)

router.get('/paymenthistory', usercontroller.paymentHistory)

module.exports = router