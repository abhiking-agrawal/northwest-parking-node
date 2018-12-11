const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    paymentId: {
        type: String
    },
    date: {
        type: String
    },
    amount :{
        type : Number
    },
    notes : {
        type : String
    }
})


const paymentHistory = mongoose.model('paymenthistory', schema)


module.exports = {
    getPaymentHistory : (cb) => paymentHistory.find({}, cb),
    
}


