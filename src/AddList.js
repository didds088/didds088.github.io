import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import $ from "jquery";
import swal from 'sweetalert';

const Check = () => {
	let unique = document.getElementById("sku").value;
	$.ajax({
	type: "POST",
	url: "https://teakings.000webhostapp.com/index.php",                  
    data: {
		  mode: "check",
          unique: unique.toLowerCase()
	},
	dataType: 'json',
	crossDomain: true,
	beforeSend: function() {
		
	},
	success: function(response) {  
	$.each(response, function(i, field) { 	
	if(response=="0") 
	{       
		document.querySelector("#help").classList.remove("text-danger");
		document.querySelector("#help").classList.add("text-success");
		document.querySelector("#skuHelp").innerHTML= unique;
		document.querySelector("#avail").innerHTML= " is available";
	}
	else{
    	document.querySelector("#help").classList.remove("text-success");
		document.querySelector("#help").classList.add("text-danger");
        document.querySelector("#skuHelp").innerHTML= unique;
        document.querySelector("#avail").innerHTML= " is not available";
	}
   }); //each. Response
  }// success function
 }); //ajax ends
    
}

//clear sku input on next input onfocus
const ClearSKU = () =>{
	if (document.querySelector("#avail").innerHTML == " is not available"){
		document.getElementById("sku").value="";
	}
}
//handles switching between product types
const Switcher = () => {
	const product = document.getElementById("productType").value;
	if (product==="DVD") {
		document.getElementById("dvd-grp").style.display="block";
		document.getElementById("furniture-grp").style.display="none";
		document.getElementById("book-grp").style.display="none";
		}
	else if (product==="furniture") {
		document.getElementById("furniture-grp").style.display="block";
		document.getElementById("dvd-grp").style.display="none";
		document.getElementById("book-grp").style.display="none";
		}
	else if (product==="book") {
		document.getElementById("book-grp").style.display="block";
		document.getElementById("furniture-grp").style.display="none";
		document.getElementById("dvd-grp").style.display="none";
		}
	else {
		document.getElementById("furniture-grp").style.display="none";
		document.getElementById("dvd-grp").style.display="none";
		document.getElementById("book-grp").style.display="none";
		}
}

// page function 
const Add = () => {
const [ name, setname] = useState("");
const [ price, setprice] = useState("");
const [ size, setsize] = useState("");
const [ height, setheight] = useState("");
const [ width, setwidth] = useState("");
const [ length, setlength] = useState("");
const [ weight, setweight] = useState("");
const navigate = useNavigate();

  
const Clear = () => {
	document.getElementById("sku").value="";
	setname("");
	setprice("");
	setsize("");
	setheight("");
	setwidth("");
	setlength("");
	setweight("");
}

const Insert = (e) => {
	$.ajax({
	type: "POST",
	url: "https://teakings.000webhostapp.com/index.php",
	data: e, 
	crossDomain: true,
	cache: false,
	beforeSend: function() {
	},
	success: function(data) {
	if (data != "error") {   
		Clear();       
		navigate("/");        
		//alert("added");
		//window.location.href="https://didds088.github.io/"
		}
	}
}); //ajax ends
}

const SubmitForm = (event) => {
	event.preventDefault();
	let sku2 = document.getElementById("sku").value;
	const n = document.getElementById("productType").value;
	if ((n ==="DVD") && (sku2!=="") && (name!=="") && (price!=="") && (size!=="")) {
	const dataString = {
				mode: "insert",
				type: n, 
				sku: sku2.toLowerCase(), 
				name: name, 
				price: price, 
				value: size+"mb", 
				measurement: "size" 
			}
		Insert(dataString);
	}
	else if ((n ==="furniture") && (sku2!=="") && (name!=="") && (price!=="") && (height!=="") && (width!=="") && (length!=="")) {
		let dimension = height + "x" + width + "x" + length;
		const dataString = {
				mode: "insert",
				type: n, 
				sku: sku2.toLowerCase(), 
				name: name, 
				price: price, 
				value: dimension, 
				measurement: "Dimension" 
			}
		Insert(dataString);
	}
	else if ((n ==="book") && (sku2!=="") && (name!=="") && (price!=="") && (weight!=="")) {
		const dataString = {
				mode: "insert",
				type: n, 
				sku: sku2.toLowerCase(), 
				name: name, 
				price: price, 
				value: weight+"kg", 
				measurement: "weight" 
			}
		Insert(dataString);
	}
	else {
		swal ( "Oops" ,  "Please, submit required data!" ,  "error" )
	}
}


 return (
	<>
		<form id="product_form" onSubmit={SubmitForm}>
		<div class="rows pt-4">
		<div class="float-start">
	    <h1 id="heading">Product Add</h1></div>
	    <div class="float-end">
		<button type="submit" class="btn btn-primary me-3">Save</button>
	    <Link class="link btn btn-danger" to="/">Cancel</Link> 
        </div>
        
        <div class="clearfix"></div>
		<hr class="border border-danger"/>
        <div class="rows">
		
  	  <div class="mb-3">
        <label for="sku" class="form-label">SKU</label>
    	<input type="text" class="form-control" id="sku" onChange={Check} />
    	<div id="help" class="form-text"><span id="skuHelp"></span><span id="avail"></span></div>
  	  </div>
  	  <div class="mb-3">
    	<label for="name" class="form-label">Name</label>
    	<input type="text" class="form-control" id="name" value={name} onChange= {(e) => setname(e.target.value)} onFocus={ClearSKU} />
  	  </div>
  	  <div class="mb-3">
    	<label for="price" class="form-label">Price ($) </label>
    	<input type="number" class="form-control" id="price" value={price} onChange= {(e) => setprice(e.target.value)} />
  	  </div>
  	  <div class="mb-3">
  	  <label for="productType" class="form-label">Type Switcher</label>
  	  <select id="productType" class="form-select" aria-label="Default select example" onChange={Switcher}>
  	  <option selected>Select type</option>
  	  <option id="DVD" value="DVD">DVD</option>
        <option id="Furniture" value="furniture">Furniture</option>
  	  <option id="Book" value="book">Book</option>
	    </select>
		</div>
		
		<div id="dvd-grp" class="mb-3">
        <label for="size" class="form-label">Size (MB) </label>
    	<input type="number" class="form-control" id="size" value={size} onChange= {(e) => setsize(e.target.value)} />
    	<div id="sizehelp" class="form-text">Please, provide size</div>
  	  </div>
  		
  	  <div id="furniture-grp">
        <div class="form-text">Please, provide dimensions</div>
  	  <div class="mb-3">
    	<label for="height" class="form-label">Height (CM)</label>
    	<input type="number" class="form-control" id="height" value={height} onChange= {(e) => setheight(e.target.value)} />
  	  </div>
  	  <div class="mb-3">
    	<label for="width" class="form-label">Width (CM) </label>
    	<input type="number" class="form-control" id="width" value={width} onChange= {(e) => setwidth(e.target.value)} />
  	  </div>
  	  <div class="mb-3">
    	<label for="length" class="form-label">Length (CM) </label>
    	<input type="number" class="form-control" id="length" value={length} onChange= {(e) => setlength(e.target.value)} />
  	  </div>
  	  </div>
  
  	  <div id="book-grp" class="mb-3">
    	<label for="weight" class="form-label">Weight (KG) </label>
    	<input type="number" class="form-control" id="weight" value={weight} onChange= {(e) => setweight(e.target.value)} />
    	<div class="form-text">Please, provide weight</div>
  	  </div>
        
		</div>
		</div></form>
		
	</> 
)}

export default Add;
