const usermodel = require('../../../models/user.model')
const paymentHistorymodel = require('../../../models/paymentHistory.model')
let userModel = require('../../../models/user.model').user

let getallusers = (req, res) => {
    usermodel.getusers(function (err, users) {
        if (err) res.status(422).json(err)
        return res.status(200).json(users)
    })
}

module.exports.getallusers = getallusers

let getonebyid = (req, res) => {
    usermodel.getuserbyid(req.params.id)
        .then(user => {
            return res.json(user)
        })
        .catch(err => {
            if (err) res.send(422, err.message)
        })
}
module.exports.getonebyid = getonebyid

let createuser = (req, res) => {
    usermodel.adduser(req.body)
        .then(user => {
            return res.status(200).json({msg :'user registered successfully'})
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
module.exports.createuser = createuser

let deleteuser = (req, res) => {
    usermodel.deleteuser(req.params.id)
        .then(user => {
            return res.status(200).json({msg : 'user deleted successfully'})
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
module.exports.deleteuser = deleteuser

let updateuser = (req, res) => {
    usermodel.updateuser(req.params.id, req.body)
        .then(user => {
            return res.status(200).json({msg : 'user updated successfully'})
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
module.exports.updateuser = updateuser

let login = (req, res) => {
    if (req.body.username && req.body.password) {
        userModel.findOne({ emailId: req.body.username }, function (err, user) {
            if (err) res.status(401).send("Error while getting user");
            if (!user) {
                return res.status(401).send('User Does not exist')
            }
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) res.status(400).send("Error while comparing password");
                if (isMatch) {

                    return res.status(200).send(user)
                } else {
                    return res.status(401).send("Authentication Failed")
                }

            })
        })
    } else {
        return res.status(401).send('Invalid input')
    }

}
module.exports.login = login


let paymentHistory = (req, res) => {
    paymentHistorymodel.getPaymentHistory(function (err, users) {
        if (err) res.status(422).json(err)
        return res.status(200).json(users)
    })
}

module.exports.paymentHistory = paymentHistory