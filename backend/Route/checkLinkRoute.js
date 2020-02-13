const express = require('express');
const router = express.Router();
const create=require('../Controller/checkLinkController')
router.post('/',create.checkLink);

module.exports=router;