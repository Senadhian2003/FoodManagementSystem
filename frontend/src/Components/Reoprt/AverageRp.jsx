import React from 'react'
import axios from "axios";
import { useState,useEffect,useRef } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';


export default function Average() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")
    const componentRef = useRef();

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
       <ReactToPrint
        trigger={() => <button className='btn btn-success btn-p'>Print this out!</button>}
        documentTitle="Average Report"
        content={() => componentRef.current}
      />
          <div className='row'>
        <div className='col-12'>
       <Link to="/rep"> <Button variant="success" className="btn-b">Back</Button></Link>
          <h1>AVERAGE REPORT</h1>
        </div>
      </div>
      <div className='row itm'>
        <div className='col-12 itm-c'>
        <input placeholder='Enter item to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
        <Button variant="success" className='btn-catg'>SEARCH</Button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 tab-it' ref={componentRef}>
          <Table >
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>Total Quantity</th>
                <th>Total AMOUNT</th>
                <th>Average Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((e)=>e.item.includes(query.toLocaleUpperCase())).map((e)=>{return(<tr><td>{e.item}</td><td>{e.quantity.toFixed(2)}</td><td>{e.amount.toFixed(2)}</td><td>{(e.amount/e.quantity).toFixed(2)}</td></tr>)})}
            </tbody>
          </Table>
        </div>
      </div>
    
      
        
    </div>
  )
}
