const express = require('express');
const router = express.Router();
const create=require('../../Controller/User/signinUserController')
router.post('/',create.signinUser);

module.exports=router;