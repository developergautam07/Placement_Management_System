import React from 'react';
import './style.css';

function Home() {
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
				<li class="nav-item">
					<a class="nav-link" href="/features">Features</a>
				</li>
				<li class="nav-item active">
					<a class="nav-link" href="/pricing">Pricing</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/contact">Contact</a>
				</li>
			</ul>
		</div>
	</nav>

	{/* <!-- Jumbotron --> */}
	<div class="jumbotron jumbotron-fluid">
		<div class="container">
			<h1 class="display-4">Pricing</h1>
			<p class="lead">Choose the plan that best fits your trading needs.</p>
		</div>
	</div>

	{/* <!-- Pricing Section --> */}
	<section id="pricing" class="pb-5">
		<div class="container">
			<div class="row">
				{/* <!-- Free Plan --> */}
				<div class="col-lg-4">
					<div class="card mb-5 mb-lg-0">
						<div class="card-body">
							<h5 class="card-title text-muted text-uppercase text-center">Free</h5>
							<h6 class="card-price text-center">₹0<span class="period">/month</span></h6>
							<hr/>
							<ul class="fa-ul">
								<li><span class="fa-li"><i class="fas fa-check"></i></span>1 Trading Strategy</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Automated Trading</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Real-time Analysis</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Backtesting</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Customizable Strategies</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Portfolio Management</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Dedicated Support</li>
							</ul>
							<a href="#" class="btn btn-block btn-primary text-uppercase">Sign Up</a>
						</div>
					</div>
				</div>
				{/* <!-- Standard Plan --> */}
				<div class="col-lg-4">
					<div class="card mb-5 mb-lg-0">
						<div class="card-body">
							<h5 class="card-title text-muted text-uppercase text-center">Standard</h5>
							<h6 class="card-price text-center">₹299<span class="period">/month</span></h6>
							<hr/>
							<ul class="fa-ul">
								<li><span class="fa-li"><i class="fas fa-check"></i></span>5 Trading Strategies</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Backtesting</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Real-time Analysis</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Automated Trading</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Customizable Strategies</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Portfolio Management</li>
								<li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>Dedicated Support</li>
							</ul>
							<a href="#" class="btn btn-block btn-primary text-uppercase">Sign Up</a>
						</div>
					</div>
				</div>
				{/* <!-- Premium Plan --> */}
				<div class="col-lg-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title text-muted text-uppercase text-center">Premium</h5>
							<h6 class="card-price text-center">₹999<span class="period">/month</span></h6>
							<hr/>
							<ul class="fa-ul">
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Unlimited Trading Strategies</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Backtesting</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Real-time Analysis</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Automated Trading</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Customizable Strategies</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Portfolio Management</li>
								<li><span class="fa-li"><i class="fas fa-check"></i></span>Dedicated Support</li>
							</ul>
							<a href="#" class="btn btn-block btn-primary text-uppercase">Sign Up</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	{/* <!-- Footer --> */}
	<footer class="py-5 bg-dark">
		<div class="container">
			<p class="m-0 text-center text-white">&copy; 2023 Algorithmic Trading Bot</p>
		</div>
		{/* <!-- /.container --> */}
	</footer>
    </div>
  );
}

export default Home;
