import React from 'react'
import axios from "axios";
import { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function MonthlyRp() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3002/monthly/report",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)

            console.log(response.data)
        });

    },[])
    
    console.log(data)
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
          <input placeholder='Enter category to search.....' type="text" className='inpt-catg'  value={query}/>
          {/* onChange={(e)=>{setquery(e.target.value)}} */}
          <Button variant="success" className='btn-catg'>SEARCH</Button>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 tab-it'>
            
          <table class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">Opening</th>
      <th scope="col">Purchase</th>
      <th scope="col">Total</th>
      <th scope="col">RMK</th>
      <th scope="col">RMD</th>
      <th scope="col">RMKCET</th>
      <th scope="col">SCHOOL</th>
      <th scope="col">IssTot</th>
      <th scope="col">Closing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
  
      </div>
    )
}
