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
        axios.get("http://localhost:3002/monthly/MonthlyReport",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)
            console.log(response,"Com")
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
          <h1>Comparison</h1>
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
                <th scope="col"  rowspan="2">ITEM</th>
                <th scope="col" colSpan="2">JAN</th>
                <th scope="col" colSpan="2">FEB</th>
                <th scope="col" colSpan="2">MAR</th>
                <th scope="col" colSpan="2">APR</th>
                <th scope="col" colSpan="2">MAY</th>
                <th scope="col" colSpan="2">JUN</th>
                <th scope="col" colSpan="2">JUL</th>
                <th scope="col" colSpan="2">AUG</th>
                <th scope="col" colSpan="2">SEP</th>
                <th scope="col" colSpan="2">OCT</th>
                <th scope="col" colSpan="2">NOV</th>
                <th scope="col" colSpan="2">DEC</th>
              </tr>
              <tr>
                
                
                <td scope="col" >Qty</td>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
                <th scope="col" >Qty</th>
                <th scope="col" >AMT</th>
               
                
              </tr>
            </thead>
            <tbody>
              {data.filter((e)=>e.item.includes(query.toLocaleUpperCase())).map((e)=>{return(<tr><td>{e.item}</td>
              <td>{e.Jan_Amount}</td>
              <td>{e.Jan_Quantity}</td>
              <td>{e.Feb_Amount}</td>
              <td>{e.Feb_Quantity}</td>
              <td>{e.Mar_Amount}</td>
              <td>{e.Mar_Quantity}</td>
              <td>{e.Apr_Amount}</td>
              <td>{e.Apr_Quantity}</td>
              <td>{e.May_Amount}</td>
              <td>{e.May_Quantity}</td>
              <td>{e.Jun_Amount}</td>
              <td>{e.Jun_Quantity}</td>
              <td>{e.Jul_Amount}</td>
              <td>{e.Jul_Quantity}</td>
              <td>{e.Aug_Amount}</td>
              <td>{e.Aug_Quantity}</td>
              <td>{e.Sep_Amount}</td>
              <td>{e.Sep_Quantity}</td>
              <td>{e.Oct_Amount}</td>
              <td>{e.Oct_Quantity}</td>
              <td>{e.Nov_Amount}</td>
              <td>{e.Nov_Quantity}</td>
              <td>{e.Dec_Amount}</td>
              <td>{e.Dec_Quantity}</td>
              
              </tr>)})}
            </tbody>
          </Table>
        </div>
      </div>
    
      
        
    </div>
  )
}
