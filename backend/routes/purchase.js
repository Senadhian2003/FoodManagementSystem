const mysql=require('mysql2');
var express = require('express');
var router = express.Router();
const conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'Sena@2003',      
  database: 'stock' 
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
const bodyParser = require('body-parser');


//api calls

router.get('/getItems', async(req,res)=>{
    
  const items = await conn.promise().query(`SELECT DISTINCT(item) FROM category ORDER BY item;`);
  res.status(200).send(items[0]);

});

router.post('/add', async (req, res) => {
  console.log("jus print");
  var arr = req.body.arr;
  console.log(req.body.arr);
  var length = arr.length;
  let date=req.body.date;
  for(let i=0;i<length;i++){
  var item=arr[i].item;
  var category=arr[i].category;
  var quantity=arr[i].quantity;
  var amountkg=arr[i].amount;
  var amount=arr[i].total;
  var vendor=arr[i].vendor;
  var sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,?)`;
  var sql1 = `Insert ignore into category (item,category) values (?,?)`
  var sql2 = `Insert ignore into vendor (vendorName,category) values (?,?)`
  var sql3 = `INSERT INTO current (item, category,quantity)
  VALUES (?,?,?)
  ON DUPLICATE KEY UPDATE item=?, quantity = quantity+?`


  await conn.promise().query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
  });
  await conn.promise().query(sql1,[item,category], function(err, re) {
    if (err) throw err;
  });
  await conn.promise().query(sql2,[category,vendor], function(err, res) {
    if (err) throw err;
  });
  await conn.promise().query(sql3,[item, category,quantity,item,quantity], function(err, res) {
    if (err) console.log(err);
  });
}
  res.send("Items inserted");

});

router.post('/getCategoryVendor',function(req,res){
let item=req.body.item;
let sql=`select vendorName,category from vendor where category = (select distinct(category) from category where item='${item}')`;
conn.query(sql,item,function(err,result){
  if(err) throw err;
  res.send(result);
})   

})
module.exports=router;