import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import LandingPage from './components/Home';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import StudentLogin from './components/Login';
import AdminLogin from './components/AdminLogin';
import Landing from './components/Landing';
import ListingPage from './components/JobsListing';
import MyProfile from './components/MyProfile';
import Settings from './components/Settings';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/jobs" element={<ListingPage />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
