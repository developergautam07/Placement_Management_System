import React from 'react';
import './style.css';
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from '../config/config'; 

function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      setIsLoggedIn(true);
    }

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.email || !formData.message) {
        alert('All fields are required.');
        return;
      }

      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ record: formData  }),
      });
      console.log('Contact form submitted:', response.data);

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      alert('Contact form submitted successfully!');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit contact form. Please try again later.');
    }
  };

  return (
    <div>
      {/* <!-- Navigation Bar --> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Opportunity Cruiser</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/features">Features</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            {isLoggedIn && (
            <li className="nav-item">
              <a className="nav-link" href="/jobs">Jobs</a>
            </li>
            )}
          </ul>
        </div>
      </nav>

      {/* <!-- Contact Form --> */}
      <div className="container mt-5 p-6">
        <h1 className="text-center mb-5">Contact Us</h1>
        <div className="row">
          <div className="col-lg-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Enter your message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">Submit</button>
          </form>
          </div>
        </div>
      </div>

    <footer className="page-footer font-small bg-dark text-light">
	  <div class="container">
			<div class="row">
				<div class="col-md-12">
					<p>© 2024 Opportunity Cruiser. All rights reserved.</p>
				</div>
			</div>
		</div>
      </footer>
    </div>
  );
}

export default Contact;
