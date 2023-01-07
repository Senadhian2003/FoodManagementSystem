import React from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './report.css'
import { useState,useEffect } from 'react';
export default function CatogeryRp() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState()
    const[query,setquery] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3002/disp/result",{
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
          <h1>CATEGORY</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 ser-col'>
        <SearchIcon className="ser"/>
              <input placeholder='Enter category to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
              <Button variant="success" className='btn-catg'>SEARCH</Button>
        </div>
      </div>
      <div className='row r-p'>
        <div className='col-4 pur'><h4>Total Puchase : {data[1][0]} </h4> </div>
        <div className='col-4'> </div>
        <div className='col-4 dis'><h4>Total Dispatch : {data[1][1]} </h4> </div>
      </div>
      <div className='row'>
        <div className='col-12 tab-col'>
          <Table>
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>PURCHASED AMT</th>
                <th>DISPATCHED AMT</th>
              </tr>
            </thead>
            <tbody>
              {data[0].filter(e=>e.cat.includes(query)).map((e)=>{return(
                <tr>
                  <td>{e.cat}</td>
                  <td>{e.purchasedAmount}</td>
                  <td>{e.dispatchedQuantity}</td>
                </tr>
              )})}
            </tbody>
          </Table>
        </div>
      </div>
      
    </div>
  )
}
