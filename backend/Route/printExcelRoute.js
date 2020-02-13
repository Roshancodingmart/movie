const express = require('express');
const router = express.Router();
const create=require('../Controller/printExcelController')
router.get('/',create.printExcel);

module.exports=router;