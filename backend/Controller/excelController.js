 const conn = require("../db.js");
 const Excel = require('exceljs');
const excel = (req, res) => {
    
conn.client.query(`SELECT * FROM public.new`,async(err,resp)=>{
    if(err){
        console.log(err)
    }
    // console.log(resp.rows[0].name)
    
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet('Sheet 1',{properties:{tabColor:"red"}});
    worksheet.columns = [
        {header: 'Email', key: 'mail'},
        {header: 'Name', key: 'name'},
        {header: 'Password', key: 'pass'},
        {header: 'Created on',key: 'add'},
        {header: 'Updated on',key: 'update'},
        {header: 'Deleted on',key: 'delete'}
       ];
    resp.rows.map(async(value)=>{
        await worksheet.addRow({mail:value.email, name: value.name, pass: value.password, add: value.added, update: value.updated, delete: value.deleted });
    })
    var name="Report.xlsx"
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + name);
      await workbook.xlsx.write(res)
    //   console.log(res)
      res.end();
})


  };
  module.exports = {
    excel
  };
  