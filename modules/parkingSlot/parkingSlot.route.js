const express = require('express')
const router = express.Router()
const parkingSlotcontroller = require('./controllers/parkingSlot.controller')

router.get('/all', parkingSlotcontroller.getallparkingSlots)
router.get('/user', parkingSlotcontroller.getallparkingSlotsForUser )

router.get('/getone/:id', parkingSlotcontroller.getonebyid)

router.post('/create',parkingSlotcontroller.createparkingSlot)

router.get('/delete/:id', parkingSlotcontroller.deleteparkingSlot)

router.post('/edit/:id', parkingSlotcontroller.updateparkingSlot)

module.exports = router