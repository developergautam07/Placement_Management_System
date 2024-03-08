import React, { useState } from 'react';
import './style.css';
import { FaBars } from 'react-icons/fa';

function Navbar({ studentName }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pricing">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
          <span className="navbar-text mx-auto">{studentName}</span>
          <div>
            <a className="btn btn-outline-warning me-2" href="/student" role="button">Student</a>
            <a className="btn btn-outline-warning me-2" href="/logout" role="button">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
