const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/monthlyReport', async(req,res)=>{
     
    
  var f= req.query.fdate
  var t=req.query.tdate
  console.log(f)
    let result= await db.promise().query(`SELECT c.item, 
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 1 THEN p_sub.quantity ELSE 0 END), 0) as "Jan",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 2 THEN p_sub.quantity ELSE 0 END), 0) as "Feb",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 3 THEN p_sub.quantity ELSE 0 END), 0) as "Mar",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 4 THEN p_sub.quantity ELSE 0 END), 0) as "Apr",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 5 THEN p_sub.quantity ELSE 0 END), 0) as "May",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 6 THEN p_sub.quantity ELSE 0 END), 0) as "Jun",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 7 THEN p_sub.quantity ELSE 0 END), 0) as "Jul",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 8 THEN p_sub.quantity ELSE 0 END), 0) as "Aug",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 9 THEN p_sub.quantity ELSE 0 END), 0) as "Sep",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 10 THEN p_sub.quantity ELSE 0 END), 0) as "Oct",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 11 THEN p_sub.quantity ELSE 0 END), 0) as "Nov",
    COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 12 THEN p_sub.quantity ELSE 0 END), 0) as "Dec"
FROM current c
LEFT JOIN (
SELECT item, date, SUM(quantity) as quantity
FROM purchase
WHERE date BETWEEN '${f}' AND '${t}'
GROUP BY item, date

) p_sub ON c.item = p_sub.item
GROUP BY c.item`);

    // console.log(result[0])  
    res.status(200).send(result[0]);

});

module.exports = router;      