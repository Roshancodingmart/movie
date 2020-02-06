const express = require('express');
const router = express.Router();
const create=require('../Controller/mailUserController')
router.post('/',create.mailUser);

module.exports=router;