const express = require('express');
const router = express.Router();
const create=require('../../Controller/User/userTableController')
router.get('/',create.userTable);

module.exports=router;