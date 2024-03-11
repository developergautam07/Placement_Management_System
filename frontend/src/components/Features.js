import React from 'react';
import './style.css';
import { useEffect, useState } from "react";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      setIsLoggedIn(true);
    }

  }, []);

  return (
    <div>
     {/* <!-- Navigation Bar --> */}
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a class="navbar-brand" href="#">Opportunity Cruiser</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
            <li class="nav-item">
					<a class="nav-link" href="/">Home</a>
				</li>
				<li class="nav-item  active">
					<a class="nav-link" href="/features">Features</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/contact">Contact</a>
				</li>
				{isLoggedIn && (
				<li className="nav-item">
					<a className="nav-link" href="/jobs">Jobs</a>
				</li>
				)}
			</ul>
		</div>
	</nav>

	{/* <!-- Jumbotron --> */}
	<div class="jumbotron jumbotron-fluid">
		<div class="container">
			<h1 class="display-4">Features</h1>
			<p class="lead">Explore the advanced features of our Placement Management App.</p>
		</div>
	</div>

	{/* <!-- Features Section --> */}
	<div class="container">
		<div class="row">
			<div class="col-lg-4">
				<h2>Job Opportunities</h2>
				<p>Our platform provides access to a diverse range of job opportunities across various industries.</p>
			</div>
			<div class="col-lg-4">
				<h2>Internship Opportunities</h2>
				<p>Discover new opportunities, apply with confidence, and take the next step in your career.</p>
			</div>
			<div class="col-lg-4">
				<h2>One-on-One Sessions</h2>
				<p>Connect with industry experts and alumni through one-on-one sessions to gain valuable insights, advice, and mentorship.</p>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-4">
				<h2>Interview Preparation</h2>
				<p>Prepare for interviews with confidence using our comprehensive interview preparation resources.</p>
			</div>
			<div class="col-lg-4">
				<h2>Company Reviews & Ratings</h2>
				<p>Prepare for technical interviews, behavioral interviews, and case interviews by reviewing personalized feedback</p>
			</div>
			<div class="col-lg-4">
				<h2>Mock Tests</h2>
				<p>Access mock interviews, interview guides, and feedback from experienced professionals to refine your interview skills and increase your chances of success.</p>
			</div>
		</div>
	</div>

	{/* <!-- Footer --> */}
	<footer class="page-footer font-small bg-dark text-light">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<p>© 2024 Opportunity Cruise. All rights reserved.</p>
				</div>
			</div>
		</div>
	</footer>
    </div>
  );
}

export default Home;
