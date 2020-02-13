const express = require('express');
const router = express.Router();
const create=require('../Controller/sendMailController')
router.post('/',create.sendMail);

module.exports=router;