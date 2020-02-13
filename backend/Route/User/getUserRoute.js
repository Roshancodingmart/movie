const express = require('express');
const router = express.Router();
const create=require('../../Controller/User/getUserController')
router.post('/',create.getUser);

module.exports=router;