import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from '../../Slidebar';
import "./tables.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

export default function Dispatch2() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(2);
  
  useEffect(() => {
    axios
      .get("http://localhost:3002/dispatch/retrive")
      .then(function (response) {
        // handle success
        setItems(response.data);
        console.log(response.data,"Hiiiiiiiiiiiiiii")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const getQuantity = async (e) => {
    let itemName = e.target.value;
    let id = e.target.id;
    console.log(id);

    document.getElementById(id + " RMK").value = 0;
    document.getElementById(id + " RMD").value = 0;
    document.getElementById(id + " RMKCET").value = 0;

    console.log(itemName);
    let quantity = document.getElementById(id + " totquantity");
    let currentQuantity = document.getElementById(id + " currquantity");
    axios
      .post("http://localhost:3002/dispatch/getQuantity", {
        itemName: itemName,
      })
      .then(function (response) {
        console.log(response.data[0].quantity);
        quantity.value = response.data[0].quantity;
        currentQuantity.value = response.data[0].quantity;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addValue = (e) => {
    const element = e.target.id;
    const split = element.split(" ");
    const id = split[0];
    const place = split[1];
    // console.log(id,place)
    let quantity = document.getElementById(id + " totquantity");

    let totQuantity = parseFloat(quantity.value);
    let currQuantity = document.getElementById(id + " currquantity");
    let rmk = parseFloat(document.getElementById(id + " RMK").value);
    let rmd = parseFloat(document.getElementById(id + " RMD").value);
    let rmkcet = parseFloat(document.getElementById(id + " RMKCET").value);
    let school = parseFloat(document.getElementById(id + " SCHOOL").value);

    let currentQuantity = totQuantity - (rmk + rmd + rmkcet + school);
    if(currentQuantity<0){
      window.alert("Item Quantity exceeded max limit")
      let x =document.getElementById(id+' '+place);
      currentQuantity+=parseFloat(x.value);
      x.value=0;
    }

    currQuantity.value = currentQuantity;
  };

  const submit = () => {
    let arr = [];
    let date = document.getElementById("date").value;

    class Obj {
      constructor(item, currentQuantity,rmk,rmd,rmkcet,school) {
        this.ItemName = item;
        this.CurrentQuantity = currentQuantity;
        this.RMK = rmk;
        this.RMD = rmd;
        this.RMKCET = rmkcet;
        this.SCHOOL = school;
        this.DATE = date;
      }
    }

    let i = 0;
    for (let i = 1; i < counter; i++) {
      let item = document.getElementById(i).value;
      let currentQuantity = document.getElementById(i + " currquantity").value;
      let rmk = document.getElementById(i + " RMK").value;
      let rmd = document.getElementById(i + " RMD").value;
      let rmkcet = document.getElementById(i + " RMKCET").value;
      let school = document.getElementById(i + " SCHOOL").value;

      

      let obj = new Obj(item, currentQuantity,rmk,rmd,rmkcet,school);

      arr.push(obj);
      
    }

    
    console.log(arr);


    axios.post('http://localhost:3002/dispatch/updateDispatch', {
      ItemArray : arr

    })
    .then(async function (response) {
      await console.log(response.data);
      alert("Items updated successfully")
      window.location.reload();

    })
    .catch(async function (error) {
      await console.log(error);
    });
  };

  const addRow = () => {
    let x = document.getElementById("table");
    let row = x.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();
    let cell6 = row.insertCell();
    let cell7 = row.insertCell();
    let cell8 = row.insertCell();

    //select

    const select = document.createElement("select");
    select.setAttribute("class", "form-select");
    const option = document.createElement("option");
    const optionText = document.createTextNode("select");
    option.appendChild(optionText);
    option.setAttribute("value", "select");
    select.setAttribute("id", counter);
    select.addEventListener("change", getQuantity, false);

    select.appendChild(option);

    for (let i = 1; i < items.length; i++) {
      const option = document.createElement("option");
      const optionText = document.createTextNode(items[i].item);
      option.appendChild(optionText);
      option.setAttribute("value", items[i].item);
      select.appendChild(option);
    }

    cell2.appendChild(select);

    // totquantity

    let input1 = document.createElement("input");
    input1.setAttribute("type", "number");
    input1.setAttribute("placeholder", "Total Quantity");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("id", counter + " totquantity");
    input1.defaultValue = 0;
    input1.disabled = true;

    cell3.appendChild(input1);

    //current Quantity

    let input2 = document.createElement("input");
    input2.setAttribute("type", "number");
    input2.setAttribute("placeholder", "Current Quantity");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("id", counter + " currquantity");
    input2.defaultValue = 0;
    input2.disabled = true;

    cell4.appendChild(input2);

    //RMK

    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "RMK");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", counter + " RMK");
    input3.defaultValue = 0;
    input3.addEventListener("change", addValue, false);

    cell5.appendChild(input3);

    //RMD

    let input4 = document.createElement("input");
    input4.setAttribute("type", "number");
    input4.setAttribute("placeholder", "RMD");
    input4.setAttribute("class", "form-control");
    input4.setAttribute("id", counter + " RMD");
    input4.defaultValue = 0;
    input4.addEventListener("change", addValue, false);

    cell6.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "number");
    input5.setAttribute("placeholder", "RMKCET");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("id", counter + " RMKCET");
    input5.defaultValue = 0;
    input5.addEventListener("change", addValue, false);

    cell7.appendChild(input5);

    let input6 = document.createElement("input");
    input6.setAttribute("type", "number");
    input6.setAttribute("placeholder", "School");
    input6.setAttribute("class", "form-control");
    input6.setAttribute("id", counter + " SCHOOL");
    input6.defaultValue = 0;
    input6.addEventListener("change", addValue, false);

    cell8.appendChild(input6);

    cell1.innerHTML = counter;

    setCounter(counter + 1);
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className='col-3 dis-side'>
      <ProSidebarProvider>
      <Slidebar/>
</ProSidebarProvider>
      </div>
    
<div className="col-9">
      <div className="container">
        
          <h1 className="h1-dis">DISPATCH SECTION</h1>
        <div className="row r-dis">
          <div className="col-3">
          <label for="date"> </label>
 <input type="date" id="date" name="date" className="inpt-d"/>
          </div>
           <div className="col-3"></div>
           <div className="col-3 btn-dis"><Button onClick={addRow}>Click to Add Cols</Button></div>
        </div>
       <div className="row">
        <div className="col-12 tab-dis">
        <Table striped bordered hover id="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Select Item</th>
      <th>Total Quantity</th>
      <th>Current Quantity</th>
      <th>RMK</th>
      <th>RMD</th>
      <th>RMKCET</th>
      <th>School</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={getQuantity}
          id="1"
        >
          <option selected>Select</option>

          {items.map((item, idx) => {
            return (
              <option key={idx} value={item.item}>
                {item.item}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Total Quantity"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 totquantity"
            defaultValue={0}
            disabled
          />
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Cureent Quantity"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 currquantity"
            defaultValue={0}
            disabled
          />
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="RMK"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 RMK"
            defaultValue={0}
            onChange={addValue}
          />
        </div>
      </td>

      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="RMD"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 RMD"
            defaultValue={0}
            onChange={addValue}
          />
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="RMKCET"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 RMKCET"
            defaultValue={0}
            onChange={addValue}
          />
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="School"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 SCHOOL"
            defaultValue={0}
            onChange={addValue}
          />
        </div>
      </td>
    </tr>
  </tbody>
</Table>

        </div>
       </div>
       <Button onClick={submit} className="btn-dis2">Submit</Button>
      </div>
      </div>
    </div>
    </div>
  );
}


// <h1>DISPATCH SECTION </h1>
// <div className="date">
// <label for="date">DATE:</label>
// <input type="date" id="date" name="date" />
// </div>
// <br />
// <br />
// <button onClick={addRow}>Click me</button>


// <br />
// <br />
// <button onClick={submit}>Submit</button>
