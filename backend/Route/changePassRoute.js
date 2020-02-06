const express = require('express');
const router = express.Router();
const create=require('../Controller/changePassController')
router.post('/',create.changePassword);

module.exports=router;