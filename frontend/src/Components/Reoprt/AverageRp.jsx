import React from 'react'
import axios from "axios";
import { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Average() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3002/average/report",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)
        });

    },[])
    
    console.log(data)
  if(data)return (
    <div className='container-fluid'>
          <div className='row'>
        <div className='col-12'>
       <Link to="/rep"> <Button variant="success" className="btn-b">Back</Button></Link>
          <h1>AVERAGE REPORT</h1>
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
                <th>CATEGORY</th>
                <th>Total Quantity</th>
                <th>Total AMOUNT</th>
                <th>Average Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((e)=>e.item.includes(query)).map((e)=>{return(<tr><td>{e.item}</td><td>{e.quantity}</td><td>{e.amount}</td><td>{e.average}</td></tr>)})}
            </tbody>
          </Table>
        </div>
      </div>
    
      
        
    </div>
  )
}
