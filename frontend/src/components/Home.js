import React from 'react';
import './style.css';
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const el = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      setIsLoggedIn(true);
    }

    const typed = new Typed(el.current, {
      strings: ["Opportunity Cruiser", "Career Opportunities Platform!"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);

    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#"> &nbsp; Opportunity Cruiser</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
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
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="/jobs">Jobs</a>
              </li>
            )}
          </ul>
        </div>
        <div>
          {isLoggedIn ? (
            <button className="btn btn-outline-danger me-2" onClick={() => handleLogout()}>Logout</button>
          ) : (
            <>
              <a className="btn btn-outline-warning me-2" href="/login" role="button">Student</a>
              <a className="btn btn-outline-warning me-2" href="/admin" role="button">Admin</a>
            </>
          )}
        </div>
      </nav>

      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1><span ref={el}></span></h1>
          <p className="lead">Your platform for career opportunities.</p>
          <a className="btn btn-primary btn-lg" href="/features" role="button">Learn More</a>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src='/job_op.jpg' alt="Job Opportunities" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="col-lg-6">
            <h2>Job & Internship Opportunities</h2>
            <p>Our platform provides access to a diverse range of job and internship opportunities across various industries. Whether you're a recent graduate or an experienced professional, you can explore opportunities tailored to your skills, interests, and career goals. Discover new opportunities, apply with confidence, and take the next step in your career. Explore internships and entry-level positions to kickstart your career, or discover senior-level roles to advance your career.</p>
          </div>
        </div>

		<br></br>

        <div className="row">
          <div className="col-lg-6">
            <h2>One-on-One Sessions</h2>
            <p>Connect with industry experts and alumni through one-on-one sessions to gain valuable insights, advice, and mentorship. These personalized sessions can help you refine your career goals, improve your job search strategies, and enhance your professional skills. Get personalized guidance, ask questions, and learn from experienced professionals who are invested in your success. Enhance your skills, build confidence, and take control of your career with personalized mentorship and guidance.</p>
          </div>
          <div className="col-lg-6">
            <img src='/one_o_one.jpg' alt="Automated Trading" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

		<br></br>

        <div className="row">
          <div className="col-lg-6">
            <img src='/interview_prep.jpg' alt="Customizable Strategies" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="col-lg-6">
            <h2> Interview Preparation</h2>
            <p>Prepare for interviews with confidence using our comprehensive interview preparation resources. Access mock interviews, interview guides, and feedback from experienced professionals to refine your interview skills and increase your chances of success. Build your confidence, practice your responses, and showcase your skills to potential employers with our interview preparation tools. Prepare for technical interviews, behavioral interviews, and case interviews with expert guidance and personalized feedback.</p>
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

export default LandingPage;
