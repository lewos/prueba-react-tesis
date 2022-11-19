// import React from 'react';
// //import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom";
// import './index.css';
// import App from './App';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// let a = document.getElementById('root');
// console.log("Entro", a);

// const root = createRoot(document.getElementById('root'));
// root.render(<BrowserRouter><App /></BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";

console.log("index.js");


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);