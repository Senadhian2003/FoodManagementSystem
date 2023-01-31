const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');
const router = express.Router();

router.get('/hi', async(req,res)=>{
    let lst= []
    
    let result= await db.promise().query(`select purchase.item as ITEMNAME,(select sum(quantity) from purchase where date>='2023-01-01' and date <='2023-01-30' and item=ItemName) as purchaseQuantity,(SELECT quantity FROM closingstock WHERE date<='2023-01-01' and item=ItemName ORDER BY date DESC limit 1) as closingStock, sum(dispatch1.RMK) as RMK, sum(dispatch1.RMD) as RMD, sum(dispatch1.RMKCET) as RMKCET,
    sum(dispatch1.RMKSCHOOL) as SCHOOL from purchase inner join dispatch1 on purchase.item = dispatch1.item where purchase.date>='2023-01-01' and purchase.date<='2023-01-30' group by dispatch1.item,purchase.item
    `);

    console.log(result[0])

    // let items = await db.promise().query(`select distinct(item) from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' order by item`);
    // items=items[0]
    // for(let i=0;i<items.length;i++){
    //     let k=0
    //     fin={}
    //     fin['itemname']=items[i].item;
    //     let a= await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and item='${items[i].item}'`);
    //     a=a[0]
    //     let val =0;
    //     let purchasedQuantity = 0;
    //     for(let j=0;j<a.length;j++){
    //         val+= a[j].quantity;
    //         purchasedQuantity +=a[j].quantity
    //     }
    //     fin['purchasedQuantity']=purchasedQuantity;
    //     let rmk="RMK"
    //     let b= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmk}' and item='${items[i].item}'`);
    //     b=b[0]
    //     val=0
    //     for(let i=0;i<b.length;i++){
    //         val+=b[i].quantity;
    //     }
    //     fin["val1"]=val;
    //     k+=val
    //     //RMD
    //     let rmd="RMD"
    //     let c= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmd}' and item='${items[i].item}'`);
    //     c=c[0]
    //     val=0
    //     for(let i=0;i<c.length;i++){
    //         val+=c[i].quantity;
    //     }
    //     fin["val2"]=val;
    //     k+=val
    //     //RMKCET
    //     let rmkcet="RMKCET"
    //     let d= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmkcet}' and item='${items[i].item}'`);
    //     d=d[0]
    //     val=0
    //     for(let i=0;i<d.length;i++){
    //         val+=d[i].quantity;
    //     }
    //     k+=val
    //     fin["val3"]=val;
       
    //     //School
    //     let school="SCHOOL"
    //     let e= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${school}' and item='${items[i].item}'`);
    //     e=e[0]
    //     val=0
    //     for(let i=0;i<e.length;i++){
    //         val+=e[i].quantity;
    //     }
    //     fin["val4"]=val;
    //     k+=val
    //     fin["tot"]=k
    //     lst.push(fin)

        
        
    // }
    // console.log(lst) 
 
    await res.status(200).send(result[0]);

});

module.exports = router;   