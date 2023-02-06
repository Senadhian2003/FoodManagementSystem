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
            console.log(response)
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
                <th>ITEM</th>
                <th>JAN</th>
                <th>FEB</th>
                <th>MAR</th>
                <th>APR</th>
                <th>MAY</th>
                <th>JUN</th>
                <th>JUL</th>
                <th>AUG</th>
                <th>SEP</th>
                <th>OCT</th>
                <th>NOV</th>
                <th>DEC</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((e)=>e.item.includes(query.toLocaleUpperCase())).map((e)=>{return(<tr><td>{e.item}</td>
              <td>{e.Jan}</td>
              <td>{e.Feb}</td>
              <td>{e.Mar}</td>
              <td>{e.Apr}</td>
              <td>{e.May}</td>
              <td>{e.Jun}</td>
              <td>{e.Jul}</td>
              <td>{e.Aug}</td>
              <td>{e.Sep}</td>
              <td>{e.Oct}</td>
              <td>{e.Nov}</td>
              <td>{e.Dec}</td>
              </tr>)})}
            </tbody>
          </Table>
        </div>
      </div>
    
      
        
    </div>
  )
}
