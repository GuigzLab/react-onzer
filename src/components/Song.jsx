import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

function Song(props) {

     let { id } = useParams(Number());

     if (isNaN(id)) {
          window.location.href = '/'
     } else {
          
          return (
               <main className="container mt-3">
                    <div>
                         {id}
                    </div>
               </main>
          );
     };

}

export default Song;