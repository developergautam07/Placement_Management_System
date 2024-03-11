import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    const signupData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/sign_up', signupData);
      // console.log(response.data);
      const sessionData = response.data;
      // console.log(response.data);
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
      // redirect user to dashboard or login page after successful signup
      if (sessionData){
        window.location.href = '/dashboard';
      } 
      // else {
      //   setError("Invalid Input");
      // }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${'https://source.unsplash.com/random/?trading'})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          {' '}
          &ensp; Opportunity Cruiser
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item  active">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/features">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="bg-white rounded p-4 shadow-sm">
              <h2 className="text-center mb-4">Create an account</h2>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the terms and conditions" />
                </Form.Group>

                <Button variant="success" type="submit" className="btn-block">
                  Sign up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
