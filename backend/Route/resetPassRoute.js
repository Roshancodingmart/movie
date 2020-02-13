const express = require('express');
const router = express.Router();
const create=require('../Controller/resetPassController')
router.post('/',create.resetPassword);

module.exports=router;