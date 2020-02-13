const express = require('express');
const router = express.Router();
const create=require('../Controller/pageController')
router.post('/',create.page);

module.exports=router;