const express = require('express');
const router = express.Router();
const create=require('../Controller/createUserController')
router.post('/',create.createUser);

module.exports=router;