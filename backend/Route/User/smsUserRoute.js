const express = require('express');
const router = express.Router();
const create=require('../../Controller/User/smsUserController');
router.post('/',create.smsUser);

module.exports=router;