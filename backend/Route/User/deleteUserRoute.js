const express = require('express');
const router = express.Router();
const create=require('../../Controller/User/deleteUserController')
router.post('/',create.deleteUser);

module.exports=router;