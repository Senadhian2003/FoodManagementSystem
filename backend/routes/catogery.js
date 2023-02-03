const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/result', async(req,res)=>{
   let lst=[[],[]]
   TotPa=0;
   TotDa=0;
    let items = await db.promise().query(`select distinct(category) from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}'`);
    items=items[0]
    for(let i=0;i<items.length;i++){
        fin={}
        fin['cat']=items[i].category
        let a = await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and category='${items[i].category}' `);
        a=a[0]
        // console.log("hi")
       
        let val=0
        let purchasedQuantity=0
        let purchasedAmount=0
        for(let j=0;j<a.length;j++){
            val+=a[j].quantity;
            purchasedQuantity+=a[j].quantity;
            purchasedAmount+=a[j].amount
 
        }
        
        fin['purchasedAmount']=purchasedAmount.toFixed(2)
        TotPa+=Number(purchasedAmount.toFixed(2))
        let rate=(purchasedAmount/purchasedQuantity);
        let b = await db.promise().query(`select distinct(item) from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and category='${items[i].category}' `);
        let dispatchedQuantity=0
       
        b=b[0]
        // console.log(b)
        for(let k=0;k<b.length;k++){
            let c = await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and item='${b[k].item}' `);
            c=c[0]
            
            for(p=0;p<c.length;p++){
                dispatchedQuantity+=c[p].quantity;
            }
            
           
        }
        fin['dispatchedQuantity']=(dispatchedQuantity*rate).toFixed(2)
        let m=(dispatchedQuantity*rate)
        TotDa+=Number(m.toFixed(2))
        await lst[0].push(fin)
      
        
       
        
    }
    lst[1].push(TotPa.toFixed(2))
    lst[1].push(TotDa.toFixed(2))
    
 
    await res.status(200).send(lst);

});

module.exports = router;