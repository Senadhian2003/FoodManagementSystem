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
  var quantity=parseInt(arr[i].quantity);
  var amountkg=arr[i].amount;
  var amount=arr[i].total;

  let result = await conn.promise().query(`select quantity from current where item = '${item}'`);
  console.log(result[0][0].quantity)
    let currentQuantity = parseInt(result[0][0].quantity);
  let finalQuantity = currentQuantity + quantity
  
  var sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,?)`;
  await conn.promise().query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
  });
  conn.promise().query(`update current set quantity=${finalQuantity} where item='${item}'`);
  
  var sql = `INSERT INTO closingstock (item,quantity,date) VALUES (?,?,?)`; 
  await conn.promise().query(sql,[item,finalQuantity,date], function(err, result) {
    if (err) throw err; 
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
module.exports = router;


