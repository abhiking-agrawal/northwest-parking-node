const parkingSlotmodel = require('../../../models/parkingSlot.model')

let getallparkingSlots = (req, res) => {
    parkingSlotmodel.getparkingSlots(function (err, parkingSlots) {
        if (err) res.status(500).json(err)
        return res.status(200).json(parkingSlots)
    })
}

module.exports.getallparkingSlots = getallparkingSlots

let getallparkingSlotsForUser = (req, res) => {
    parkingSlotmodel.getparkingSlotsForUser(function (err, parkingSlots) {
        if (err) res.status(500).json(err)
        return res.status(200).json(parkingSlots)
    })
}

module.exports.getallparkingSlotsForUser = getallparkingSlotsForUser

let getonebyid = (req, res) => {
    parkingSlotmodel.getparkingSlotbyid(req.params.id)
        .then(parkingSlot => {
            return res.status(200).json(parkingSlot)
        })
        .catch(err => {
            if (err) res.status(500).json(err)
        })
}
module.exports.getonebyid = getonebyid

let createparkingSlot = (req, res) => {

    parkingSlotmodel.addparkingSlot(req.body)
        .then(parkingSlot => {
           return res.status(200).json({msg:'parkingSlot added successfully'})
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
module.exports.createparkingSlot = createparkingSlot

let deleteparkingSlot = (req, res) => {
    parkingSlotmodel.deleteparkingSlot(req.params.id)
        .then(parkingSlot => {
            return res.status(200).json({msg:'parkingSlot deleted successfully'})
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
module.exports.deleteparkingSlot = deleteparkingSlot

let updateparkingSlot = (req, res) => {
    parkingSlotmodel.updateparkingSlot(req.params.id,req.body)
        .then(parkingSlot => {
            return res.status(200).send({msg : 'parkingSlot updated successfully'})
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
module.exports.updateparkingSlot = updateparkingSlot
