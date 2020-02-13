const express = require('express');
const router = express.Router();
const create=require('../../Controller/User/createUserController')
router.post('/',create.createUser);

module.exports=router;