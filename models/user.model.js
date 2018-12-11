const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema 

const schema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please provide first name']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Please provide last name']
    },
    emailId: {
        type: String,
        trim: true,
        unique :true,
        required: [true, 'Please provide email Id']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is missing']
    },
    role: {
        type: String,
        trim: true,
        enum :['ADMIN','USER'],
        default: 'USER'
    },
    phoneNumber: {
        type: String,
        trim: true  
    },
    accessToken: {
        type: String,
        trim: true,
        default: ''
    }
})

schema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash
            next()
        })
        .catch(err => {
            next(err)
        })

})

schema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const user = mongoose.model('user', schema)


module.exports = {
    getusers: (cb) => user.find({}, cb),
    adduser: data => new user(data).save(),
    deleteuser: userid => user.findOneAndDelete(userid),
    updateuser: (userid, data) => user.findByIdAndUpdate(userid,data),
    getuserbyid: userid => user.findOne({ _id: userid }),
    user: user
}


