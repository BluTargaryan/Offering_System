import React from "react";
import GlobalStyles from "./GlobalStyles";

import {Route, Routes} from 'react-router-dom'
import Login from './pages/login'

function App() {
  return (
    <div className="App">
     <GlobalStyles/>
     <Routes>
      <Route path="/" element={<Login/>}/>
     </Routes>
    </div>
  );
}

export default App;
