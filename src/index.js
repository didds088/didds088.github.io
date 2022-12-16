import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from './ProductList';
import Add from './AddList';
 
const root = ReactDOM.createRoot(document.getElementById('root'));

/*const doSomething = (arg1, component) => {
 
console.log(arg1);
  return component;
};     element={doSomething("string", <Add />)} */
root.render(
  
    <BrowserRouter>
      <Routes>
          <Route index element={<App />} />
          <Route  path="/Add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  
);

