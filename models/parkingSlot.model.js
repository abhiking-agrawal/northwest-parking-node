const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name missing']
    },
    location: {
        type: String,
        trim: true,
        required: [true, 'description missing']
    },
    isBooked :{
        type : String,
        default : "false"
    }
})


const parkingSlot = mongoose.model('slotparking', schema)


module.exports = {
    getparkingSlots: (cb) => parkingSlot.find({}, cb),
    getparkingSlotsForUser: (cb) => parkingSlot.find({isBooked :"false"}, cb),
    addparkingSlot: data => new parkingSlot(data).save(),
    deleteparkingSlot: parkingSlotid => parkingSlot.findByIdAndRemove(parkingSlotid),
    updateparkingSlot: (parkingSlotid, data) => parkingSlot.findByIdAndUpdate(parkingSlotid, data),
    getparkingSlotbyid: parkingSlotid => parkingSlot.findOne({_id: parkingSlotid })
}


