import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Thankyou from './Component/Thankyou';
import DetailsContact from './Component/DetailsContact';
import Exp from './Component/Exp';
import Education from './Component/Education';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route exact path = '/' element = {<Home />}></Route> 
          {/* <Route exact path = '/contact' element = {<Contact />}></Route>  */}
          <Route exact path = '/thank' element = {<Thankyou />}></Route> 
          <Route exact path = '/contact-details' element = {<DetailsContact />}></Route> 
          <Route exact path = '/contact-edit/:id' element = {<Exp />}></Route> 
          <Route exact path = '/contact' element = {<Exp />}></Route> 
          <Route exact path = '/Education' element = {<Education />}></Route> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
