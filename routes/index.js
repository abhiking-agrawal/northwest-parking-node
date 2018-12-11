var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/user', require('../modules/user/user.route'))
router.use('/parkingSlot', require('../modules/parkingSlot/parkingSlot.route') )

module.exports = router;
