import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cartext';

export default function Login() {
  const submitButtonRef = useRef(null);
  const navigate = useNavigate();
  const { userName = { name: '' }, setUserName } = useCart();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState({
    message: '',
    success: '',
  });

  useEffect(() => {
    console.log('Updated userName:', userName.name);
  }, [userName]);

  function handleChange(e) {
    const emailValue = e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: emailValue,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }

    const data = {
      email: formData.email,
      password: formData.password,
    };

    setUserName({
      name: data.email,
    });

    try {
      const response = await fetch('https://finalback-q2te.onrender.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setMessage({
        message: result.message,
        success: result.success,
      });

      if (result.success) {
        // Navigate to the home page when success is true
        navigate('/home');
      }

      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }

      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error(error);

      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }
    }
  }

  return (
    <div>
      <div className="a">
        <Container>
          <Row>
            <Col>
              <h3 className="aaa">Login Here !</h3>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <img
          className="b"
          src="https://i.pinimg.com/originals/22/a1/79/22a17952eff98bc4a7ccbe7066d2fe3c.jpg"
          alt="img"
        />
        <div className="bb">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </Form.Group>
            <Button ref={submitButtonRef} variant="primary" type="submit">
              Login
            </Button>
            <Link to="/forgot">
              <Button className="button" variant="secondary">
                Forgot Password
              </Button>{' '}
            </Link>
            <Link to="/account">
              <Button variant="success">Create Account</Button>
            </Link>
          </Form>

          {message && (
            <>
              <h4>{message.message}</h4>
              {message.success ? <h3>Yes</h3> : ' '}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
