const express = require('express');
const router = express.Router();
const create=require('../Controller/excelController')
router.get('/',create.excel);

module.exports=router;