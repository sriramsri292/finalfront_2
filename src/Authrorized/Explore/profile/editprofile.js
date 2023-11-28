import React from "react";
import Form from 'react-bootstrap/Form';
import './editprofile.css';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function Editprofile(){
  const navigate = useNavigate();

  const [message, setMessage] = useState({
    message: '',
    success: '',
  });


 
    const [index, setIndex] = useState(0);
    const [formData, setFormData] = useState({
        username:"",
        dob: "",
        about: "",
        email:"",
        city:"",
        passion:""
      });
      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      console.log(formData.username);
      console.log(formData.dob);
      console.log(formData.about);
      console.log(formData.email);
      console.log(formData.city);
      console.log(formData.passion);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const onButtonClick = (nextIndex) => {
   
    setIndex(nextIndex);
  };
const data={
  email:formData.email,
  username:formData.username,
  about:formData.about,
  dob:formData.dob,
  city:formData.city,
  passion:formData.passion

}
  const handleSubmit = async () => {
    try {
      const response = await fetch('https://finalback-2.onrender.com/auth/updateprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // Handle HTTP error status
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      setMessage({
        message: result.message,
        success: result.success,
      });
      if (result.success) {
        // Navigate to the home page when success is true
        navigate('/profile');
      }
      console.log(result.message);
  
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during API call:', error.message);
  
      setMessage({
        message: 'An error occurred during the API call.',
        success: false,
      });
    }
  };
  console.log(message);
  
    return (
        <div className="EEa"> 
           
            <div className="EEf">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
          <Carousel.Item>
            <div
              className="d-block w-100"
              style={{ backgroundColor: "lightblue", height: "300px" }}
            >
              <Carousel.Caption>
                <Form>
                  <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Button variant="outline-primary" onClick={() => onButtonClick(1)}>
                    Next Slide
                  </Button>{' '}
                </Form>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div
              className="d-block w-100"
              style={{ backgroundColor: "lightblue", height: "300px" }}
            >
              <Carousel.Caption>
                <Form>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Button variant="outline-primary" onClick={() => onButtonClick(2)}>
                    Next Slide
                  </Button>{' '}
                </Form>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block w-100"
              style={{ backgroundColor: "lightgreen", height: "300px" }}
            >
              <Carousel.Caption>
                <Form>
                  <Form.Group className="mb-3" controlId="dob">
                    <Form.Label>D.O.B</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Button variant="outline-success" onClick={() => onButtonClick(3)}>
                    Next Slide
                  </Button>{' '}
                </Form>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block w-100"
              style={{ backgroundColor: "lightgreen", height: "300px" }}
            >
              <Carousel.Caption>
                <Form>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Button variant="outline-success" onClick={() => onButtonClick(4)}>
                    Next Slide
                  </Button>{' '}
                </Form>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block w-100"
              style={{ backgroundColor: "lightgreen", height: "300px" }}
            >
              <Carousel.Caption>
                <Form>
                  <Form.Group className="mb-3" controlId="passion">
                    <Form.Label>Passion</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter "
                      name="passion"
                      value={formData.passion}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Button variant="outline-success" onClick={() => onButtonClick(5)}>
                    Next Slide
                  </Button>{' '}
                </Form>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="d-block w-100"
              style={{ backgroundColor: "lightcoral", height: "300px" }}
            >
              <Carousel.Caption>
                <Form>
                  <Form.Group className="mb-3" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter about"
                      name="about"
                      value={formData.about}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Button variant="outline-danger" onClick={() => onButtonClick(0)}>
                    Go to First Slide
                  </Button>{' '}
                </Form>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        </Carousel>
        <Button onClick={handleSubmit} variant="primary">Save Data</Button>{' '}
      </div>
        </div>
    );
}