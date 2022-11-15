import React from "react";
import GlobalStyles from "./GlobalStyles";

import {Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
     <GlobalStyles/>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
     </Routes>
    </div>
  );
}

export default App;
