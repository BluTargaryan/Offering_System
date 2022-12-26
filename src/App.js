import React from "react";
import GlobalStyles from "./GlobalStyles";

import {Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import Home from "./pages/home";
import Home2 from "./pages/home2";
import Home3 from "./pages/home3";

function App() {
  return (
    <div className="App">
     <GlobalStyles/>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home2" element={<Home2/>}/>
      <Route path="/home3" element={<Home3/>}/>
     </Routes>
    </div>
  );
}

export default App;
