import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './forgot.css';

export default function Forgot() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({
    message: '',
    success: ''
  });

  function handleChange(e) {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      email: data.email,
      password: data.password
    }

    fetch('https://finalback-q2te.onrender.com/auth/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.message);

        setMessage({
          message: response.message,
          success: response.success
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
        console.error(error);
      });
  }

  return (
    <div className="fa">
      <Container >
        <Row >
          <Col xs={6} md={4}>
            <Image className="Ff" src="https://i.pinimg.com/564x/19/15/2f/19152fa00d74580919b7f8b25e57bbee.jpg" rounded />
          </Col>
         
          <Col className="FFc">
            <Form onSubmit={handleSubmit} >
              <Form.Group className="mb-32" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={data.email}
                />
                <Form.Text className="text-bold">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-32" controlId="password">
                <Form.Label>Reset Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                />
              </Form.Group>
              <Button className="Fc" variant="primary" type="submit">
                Reset Password  
              </Button>
              
              <Link to='/'>
              <Button className="Fb" variant="primary" type="submit">
                click  to Login 
              </Button>
              </Link>
                
              
            </Form>
            {message.message && (
          <>
            <h4>{message.message}</h4>
            <p>Success: {message.success ? "Yes" : "No"}</p>
          </>
        )}
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}
