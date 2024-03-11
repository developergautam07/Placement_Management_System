import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import LandingPage from './components/Home';
import Features from './components/Features';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import StudentLogin from './components/Login';
import AdminLogin from './components/AdminLogin';
import ListingPage from './components/JobsListing';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/jobs" element={<ListingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
