import React, { useState, useEffect } from "react";
import {Link } from 'react-router-dom';
import './search.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
  } from "mdb-react-ui-kit";



  


  export default function Search() {
    
const Image = (userName) => {
    switch (userName) {
      case "Naveen":
        return "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "SriDhar":
        return "https://media.istockphoto.com/id/512923237/photo/cameraman-on-set.jpg?s=612x612&w=is&k=20&c=V--Ow9sIcFXIq0B2RFNoTRgv5lCDqkhKs33_CxeAWYE=";
      case "Sriram":
        return "https://images.unsplash.com/photo-1522196772883-393d879eb14d?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Srikutty":
        return "https://w0.peakpx.com/wallpaper/698/150/HD-wallpaper-borderlands-3-director-cut.jpg";
      case "sriram":
        return "https://w0.peakpx.com/wallpaper/739/122/HD-wallpaper-alfred-hitchcock-british-film-directors-hitchcock-movies-film-directors.jpg";
      default:
        return "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.webp?s=612x612&w=is&k=20&c=trmgBj1lQm43NNkvn97YFaVMU1XnGgOYcT_GcR1x3qE=";
    }
  };
    const [users, setUsers] = useState([]);
    const [name, setName] = useState({
      userName: ''
    });
    const [foundUser, setFoundUser] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://finalback-2.onrender.com/users");
          const data = await response.json();
  
          if (response.ok) {
            setUsers(data.data);
          } else {
            console.error("Error fetching users:", data.message);
          }
        } catch (error) {
          console.error("No such User Present Sorry......:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleNameChange = (e) => {
      setName({ userName: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const foundUser = users.find((user) => user.userName === name.userName);
  
      if (foundUser) {
        console.log('User Found:', foundUser);
        setFoundUser(foundUser);
      } else {
        console.log('User not found');
        setFoundUser(null);
      }
    };

    console.log(foundUser);
    


    return(

        <div className="SSS"> 

            <div className="SSf"> 
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter The Name Of User</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the Name of the user"
          onChange={handleNameChange}
        />
        <Form.Text className="text-muted">Know the user.......</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            </div>
            <div> 
            {foundUser && (
         <MDBContainer style={{width:"60%"}}>
            <MDBRow className="justify-content-center">
              <MDBCol md="10" lg="8" xl="13" className="mt-5">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                      <MDBCardImage
  style={{ width: "180px", borderRadius: "10px" }}
  src={foundUser ? Image(foundUser.userName) : "default-image-source"}
  alt={foundUser ? foundUser.userName : "default-alt-text"}
  fluid
/>

                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>{foundUser.userName}</MDBCardTitle>
                        <MDBCardText>{foundUser.passion}</MDBCardText>

                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: "#efefef" }}>
                          <div>
                            <p className="small text-muted mb-1">Post</p>
                            <p className="mb-0">3</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0">4</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1">
                          <Link to="/message"> 
                          <MDBBtn outline className="me-1 flex-grow-1" >
                            Chat
                          </MDBBtn>
                          </Link>
                          
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          )}
          </div>
        </div>
    )
}