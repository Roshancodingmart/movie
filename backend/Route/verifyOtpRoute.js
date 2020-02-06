const express = require('express');
const router = express.Router();
const create=require('../Controller/verifyOtpController')
router.post('/',create.verifyOtp);

module.exports=router;