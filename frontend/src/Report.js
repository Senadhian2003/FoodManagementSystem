import React from 'react'
import './App.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from './Slidebar';
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
function Report() {
  const [fdate,sfdate]=useState("")
  const [tdate,stdate]=useState("")
  const [data,sdata]=useState()
  const navigate = useNavigate();
  console.log(fdate)
  function category(){
    
    localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/catogery")

  }
  function pvt(e){
      e.preventDefault()
  }
  function average(){
    localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/average")
  }
  function monthly(){
    localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/monthly")

  }
  function item(){
    localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/item")

  }
  console.log(data)
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3'>
          
        <ProSidebarProvider>
      <Slidebar/>
      </ProSidebarProvider>
        </div>
        <div className='col-9'>
          <h1 className='rep-h1'>REPORTS</h1>
          <div className='row'>
            <div className='col-6 card card-r'>
            <div class="card-body">
              <h2 className='card-title'>Monthly</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)}/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)}/></div>
        </div>
           
  </div>
  <button onClick={monthly}>Monthly</button>  
            </div>
            <div className='col-6 card-r card'><div class="card-body">
              <h2 className='card-title'>Category wise</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)}/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)}/></div>
        </div>
           
  </div>
  <button onClick={category}>Category</button>
  </div>
  
            </div>
          <div className='row'><div className='col-6 card-r card'><div class="card-body">
              <h2 className='card-title'>Item Wise</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)}/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)}/></div>
        </div>
           
  </div>
  <button onClick={item}>Item</button>
  </div><div className='col-6 card card-r'><div class="card-body">
              <h2 className='card-title'>Average</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)}/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)}/></div>
        </div>
           
  </div>
  <button onClick={average}>Average</button>
  </div></div>
        {/* <form onSubmit={pvt}>
        <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)}/>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)}/>
        <button onClick={category}>Category</button>
        <br/>
        <button onClick={average}>Average</button>
        <br/>
        <button onClick={monthly}>Monthly</button>
        <button onClick={item}>Item</button>
      </form> */}

        </div>
        

      </div>
      
             
    </div>
  )
}

export default Report