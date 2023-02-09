const mysql=require('mysql2');
var express = require('express');
const db = require('../database');
var router = express.Router();


db.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
const bodyParser = require('body-parser');


//api calls

router.get('/getItems', async(req,res)=>{
    
  const items = await db.promise().query(`SELECT DISTINCT(item) FROM category ORDER BY item;`);
  res.status(200).send(items[0]);

});

router.post('/add', async (req, res) => {
  console.log("jus print");
  var arr = req.body.arr;
  // console.log(req.body.arr);
  var length = arr.length;
  let date=req.body.date;
  for(let i=0;i<length;i++){
  var item=arr[i].item;
  var category=arr[i].category;
  var quantity=parseInt(arr[i].quantity);
  var amountkg=arr[i].amount;
  var amount=arr[i].total;
  var vendor=arr[i].vendor;
  var sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,?)`;
  var sql1 = `Insert ignore into category (item,category) values (?,?)`
  // var sql2 = `Insert ignore into vendor (vendorName,category) values (?,?)`
  
    

  const currqty = await db.promise().query(`select * from current where item='${item}'`);
  console.log(currqty,"CURR")
  // const currentQuantity = parseInt(currqty[0][0].quantity);
  const currentQuantity =0;
  console.log(currentQuantity)

  const finalQuantity = (currentQuantity + quantity);
  console.log(finalQuantity);

  await db.promise().query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
  });
  await db.promise().query(sql1,[item,category], function(err, re) {
    if (err) throw err;
  });
  // await db.promise().query(sql2,[category,vendor], function(err, res) {
  //   if (err) throw err;
  // }); 

  db.promise().query(`update current set quantity=${finalQuantity} where item='${item}'`);
    var sql = `INSERT INTO closingstock (item,quantity,date,category) VALUES (?,?,?,?)`; 
    await db.promise().query(sql,[item,finalQuantity,date,category], function(err, result) {
      if (err) throw err; 
    });
  
}
  res.send("Items inserted");

});

router.post('/getCategoryVendor',function(req,res){
let item=req.body.item;
let sql=`select vendorName,category from vendor where category = (select distinct(category) from category where item='${item}' )`;
db.query(sql,item,function(err,result){
  if(err) throw err;
  console.log(result)
  res.send(result);
})   

})
module.exports=router;