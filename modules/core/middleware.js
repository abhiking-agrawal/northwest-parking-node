let jwt = require('jsonwebtoken')
let userModel = require('../../models/user.model').user
let config = require('../../config/config')

let tokenAuthentication = (req, res, next) => {
    if (req.headers.token || req.query.token) {
      try {
        let decoded = jwt.verify(req.headers.token || req.query.token, config.tokensecret)
          userModel.findOne({ emailId: decoded.username }, function (err, user) {
            req.session.user = user
            if (err) res.status(401).send("Error while getting user");
            if(!user) return res.status(401).send('User Does not exist')
            try {
              jwt.verify( user.AccessToken , config.tokensecret)
              req.session.user = user
              next()
            }catch (err) {
              return  (req.path === "/resetpassword" && req.method === "GET") || 
                      (req.path === "/confirmresetpassword" && req.method === "POST") ? next() : res.status(401).send("Unauthorized") 
            }
          })
      } catch (err) {
        res.status(401).send("Unauthorized")
      }
    } else {
      if (req.body.username && req.body.password) {
        userModel.findOne({ emailId: req.body.username }, function (err, user) {
          if (err) res.status(401).send("Error while getting user");
              if(!user){
                 return res.status(401).send('User Does not exist')
              }
              if(!req.body.password){
                req.session.user = user
                next()
              }
              user.comparepassword(req.body.password, function (err, isMatch) {
                if (err) res.status(400).send("Error while comparing password"); 
                if(isMatch) {
                        var data = {
                          username: req.body.username,
                          password: req.body.password
                        }
                        var token = jwt.sign(data, config.tokensecret, { expiresIn: '1h' })
                        req.session.token = token
                        req.session.user = user
                        next()
                    }else{
                        return res.status(401).send("Authentication Failed")
                    }  
                 
               })
        })
      } else if(req.body.username){
          userModel.findOne({ emailId: req.body.username }, function (err, user) {
            if (err) res.status(401).send("Error while getting user");
                if(!user) return res.status(401).send('User Does not exist')
                  req.session.user = user
                  return req.path === "/resetpassword" && req.method === "POST" ? next() : res.status(401).send("Unauthorized")
            })
      }else{
       //next()
       res.status(401).send("Unauthorized")
      }
    }
  }

module.exports = tokenAuthentication