import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import About from './Javascripts/About';
import Contact from './Javascripts/Contact';
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Add" element={<About />} />
          <Route path="/Update" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
