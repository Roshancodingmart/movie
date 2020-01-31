const express = require('express');
const router = express.Router();
const create=require('../Controller/userTableController')
router.post('/',create.userTable);

module.exports=router;