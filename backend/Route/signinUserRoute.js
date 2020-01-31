const express = require('express');
const router = express.Router();
const create=require('../Controller/signinUserController')
router.post('/',create.signinUser);

module.exports=router;