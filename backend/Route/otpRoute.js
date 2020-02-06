const express = require('express');
const router = express.Router();
const create=require('../Controller/otpController')
router.post('/',create.otp);

module.exports=router;