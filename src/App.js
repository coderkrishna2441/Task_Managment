import React from 'react'
import {Landing} from './component/Landing'
import {Home} from './component/Home'
import {Add} from './component/Add'
import {Show} from './component/Show'
import {Delete} from './component/Delete'
import {NotFound} from './component/NotFound'
import {Update} from './component/Update'
import { BrowserRouter as Router, Routes, Route , useNavigate } from 'react-router-dom';


class App extends React.Component{
  render(){
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="Home/" element={<Home/>}/>
        <Route path="add/" element={<Add/>}/>
        <Route path="show/" element={<Show/>}/>
        <Route path="delete/" element={<Delete/>}/>
        <Route path="update/" element={<Update/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
    )
  }
}



export default App;
