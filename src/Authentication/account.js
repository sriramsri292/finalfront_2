import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import './account.css';
import Form from 'react-bootstrap/Form';



import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';

export default function Account() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
  });

  const [message, setMessage] = useState({
    message: '',
    success: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Disable the submit button to prevent multiple submissions
    console.log("handleSubmit called");
    document.getElementById("submit-button").disabled = true;

    const data = {
      email: formData.email,
      password: formData.password,
      userName: formData.firstName,
    };

    fetch('https://finalback-2.onrender.com/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert the data to JSON and include it in the request body
    })
      .then((res) => res.json())
      .then((response) => {
        // Handle the response data here
        console.log(response.message);
        console.log(response.success); 
        if (response.success) {
          // Navigate to the home page when success is true
          navigate('/login');
        }
        // Log the message directly here
        setMessage({
          message: response.message,
          success: response.success,
        });

        // Re-enable the submit button after processing
        document.getElementById("submit-button").disabled = false;

        if (response.success) {
          // Navigate to the home page when success is true
          window.location.href = '/'; // Replace '/' with the desired route
        }

        setFormData({
          email: '',
          password: '',
        });
      })
      .catch((error) => {
        console.error(error);
        setMessage({
            message: "Error creating user. Please try again.",
            success: false,
        });
        document.getElementById("submit-button").disabled = false;
    });
    
      console.log(message);
  }

  return (
    <div className="AA">
      <img className="Aa" src="https://c4.wallpaperflare.com/wallpaper/321/512/923/tom-and-jerry-heroes-cartoons-desktop-hd-wallpaper-for-mobile-phones-tablet-and-pc-1920%C3%971200-wallpaper-preview.jpg" alt="img" />
      <div className="Ab">
        <Form onSubmit={handleSubmit}> 
        <MDBContainer fluid={true} >
          <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign up</p>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput label='Your Name' id='form1' type='text' className='w-100' name="firstName" value={formData.firstName} onChange={handleInputChange} />
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='envelope me-3' size='lg' />
                    <MDBInput label='Your Email' id='form2' type='email' name="email" value={formData.email} onChange={handleInputChange} />
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='lock me-3' size='lg' />
                    <MDBInput label='Password' id='form3' type='password' name="password" value={formData.password} onChange={handleInputChange} />
                  </div>

                  <div className='mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Verify Details' />
                  </div>

                  <MDBBtn id="submit-button" className='mb-4' size='lg' type="submit">
                    Register
                  </MDBBtn>
                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        </Form>
      </div>
    </div>
  );
}
