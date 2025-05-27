import React from 'react';
import '../Styles/Nav.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">To Do List</div>
      <ul className="navbar-links">
        <li><Link to="/">Show</Link></li>
        <li><Link to="/Add">Add</Link></li>
        <li><Link to="/Update">Update/Delete</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;