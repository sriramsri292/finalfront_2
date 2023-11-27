import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './upload.css';
import { useCart } from "../../../cartext";
import {  useNavigate } from 'react-router-dom';

export default function Upload() {

  const navigate = useNavigate();
  const { userName = { name: "" } } = useCart();
  const [formData, setFormData] = useState({
    email: userName.name, 
    profileImage: null,
    postImage: null,
  });

  const [formDataToSend, setFormDataToSend] = useState(null); // Initialize formDataToSend state

  const handleProfileImageChange = (event) => {
    setFormData({
      ...formData,
      profileImage: event.target.files[0],
    });
  };

  const handlePostImageChange = (event) => {
    setFormData({
      ...formData,
      postImage: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log("formData before conversion:", formData);
  
      const newFormData = new FormData();
      newFormData.append("email", formData.email);
      newFormData.append("profileImage", formData.profileImage);
      newFormData.append("postImage", formData.postImage);
  
      setFormDataToSend(newFormData);
  
      const response = await fetch("https://finalback-q2te.onrender.com/users/upload", {
        method: "POST",
        body: newFormData,
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed.');
      }
  
      const data = await response.json();
      

      console.log(data);
      if (data.success) {
        // Navigate to the home page when success is true
        navigate('/profile');
      }
      setFormData({
        email: userName.name,
        profileImage: null,
        postImage: null,
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    console.log("formDataToSend: ", formDataToSend);
  }, [formDataToSend]);

  return (
    <div className="Ua">
      <div>
        <h1 className="Uu">Upload here ....</h1>
      </div>

      <div className="Uf">
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Group controlId="formProfileImage" className="mb-3">
              <Form.Label>Upload profile image here</Form.Label>
              <Form.Control type="file" onChange={handleProfileImageChange} />
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="formPostImage" className="mb-3">
              <Form.Label>Upload your post here</Form.Label>
              <Form.Control type="file" onChange={handlePostImageChange} />
            </Form.Group>
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
