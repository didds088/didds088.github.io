import {Link} from "react-router-dom";
import $ from "jquery";

//load database
function Load() {
$.ajax({
	type: "POST",
	url: "https://teakings.000webhostapp.com/index.php",
    data: {
		mode : 'view'
	},
	dataType: 'json',
	crossDomain: true,
	beforeSend: function() {
                      //preloader
	},
	success: function(response) {
	$.each(response, function(i, field) {
	let name = field.name;
	let unique = field.sku;
	let price = field.price;
	let measure = field.measurement;
	let weight = field.value;
	let id = field.id;
	if(response!="0")
	{
		const create = document.createElement("div");
		create.innerHTML = '<section class="tab"><div class="title"><input class="form-check-input delete-checkbox" type="checkbox" name="option1" value="'+id+'" /></div><div class="product-items"><p id="'+id+'">'+unique+'</p><p>'+name+'</p><p class="text-primary fw-bold">'+price+'<span> $</span></p><p>'+measure+': <span>'+weight+'</span></p></div></section>';
		document.getElementById("lists").appendChild(create);
	}

   }); //each. Response
  }// success function
 }); //ajax ends
}
 //load database

const App =()=> {

	Load();
 // mass delete button 
const remove = () => {
	let selected = [];
	let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

	for (let i = 0; i < checkboxes.length; i++) {
  		selected = Array.from(checkboxes).map(x => x.value);
	}

let deleting = "";
selected.forEach(deleted);

//pass checkbox arrays into ajax data
function deleted(item) {
deleting += $.ajax({
	type: "POST",
	url: "https://teakings.000webhostapp.com/index.php",
	data: {
		mode: "deleted",
		selected: item
	},
	crossDomain: true,
	cache: false,
	beforeSend: function() {
	},
	success: function(data) {
	
	if (data != "error") {                   
		window.location.reload();
		}
	}
}); //ajax ends     
  
}//deleted function ends
}//remove ends

  return (
      <>     
      <div className="rows pt-4">
      <div className="float-start">
	  <h1 id="heading">Product List</h1></div>
	  <div className="float-end">
	  <Link className="link btn btn-danger me-3" to="/Add">ADD</Link>
	  <button type="button" className="btn btn-secondary" onClick={remove}>MASS DELETE</button>
    </div>
    
    </div>    
	 <div className="clearfix"></div>
	<hr className="border border-danger"/>
      <div id="lists" className="rows">
      
    <div className="clearfix"></div>
      </div>
        
        <div className="footer">  
        
        <div className="clearfix"></div>
        <hr className="border border-danger mt-5"/>
      <h5 className="text-center">Scandiweb Test Assignment</h5>
	  </div>
      </>
  );
}

export default App;
