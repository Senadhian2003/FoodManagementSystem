import React from 'react'
import axios from "axios";
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
export default function ItemRp() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3002/item/hi",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)

            console.log(response.data)
        });

    },[])
    
    console.log(fdate,tdate)
    if(data)return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
        <Link to="/rep"> <Button variant="success" className="btn-b">Back</Button></Link>
          <h1>ITEM WISE</h1>
        </div>
      </div>
      <div className='row itm'>
        <div className='col-12 itm-c'>
        <input placeholder='Enter category to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
        <Button variant="success" className='btn-catg'>SEARCH</Button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 tab-it'>
          
          <Table>
            <thead>
              <tr>
                <th>ITEMS</th>
                <th>PURCHASE</th>
                <th>RMK</th>
                <th>RMD</th>
                <th>RMKCET</th>
                <th>SCHOOL</th>
                <th>ToTal</th>
              </tr>
            </thead>
            <tbody>
          {data.filter((e)=>e.itemname.includes(query)).map((e)=>{return(<tr><td>{e.itemname}</td><td>{e.purchasedQuantity}</td><td>{e.val1}</td><td>{e.val2}</td><td>{e.val3}</td><td>{e.val4}</td>{e.tot}<td></td></tr>)})}
            </tbody>
          </Table>
        </div>
      </div>

    </div>
  )
}
