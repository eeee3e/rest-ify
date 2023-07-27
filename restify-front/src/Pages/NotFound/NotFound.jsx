import React from "react";
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";



function NotFound() {

  return (

    
    <div>
      <center>
        <h1 className="text-white" style={{ marginTop: '5rem'}}>404 - Page not Found.</h1>
        <Link to="/home">Go Home</Link>
      </center>
    </div>
    

  );
}

export default NotFound;