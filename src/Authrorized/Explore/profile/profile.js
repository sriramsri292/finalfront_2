import React, { useEffect, useState } from 'react';
import './profile.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useCart } from '../../../cartext';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from 'mdb-react-ui-kit';

const Profile = () => {
  const [data, setData] = useState({});
  const { userName = { email: '' } } = useCart(); // Assuming email is the relevant property

  const fetchData = async () => {
    try {
      const emailToFetch = userName.name ? userName.name : 'sriram@gmail.com';
      const response = await fetch('https://finalback-q2te.onrender.com/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToFetch }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("from profile ",result.data);
      setData(result.data);
    
    } catch (error) {
      console.error('Error during API call:', error.message);
    }
  };

  useEffect(() => {
    fetchData();

    // Disabling the eslint warning for missing dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='Pa'>
      <div className='Pn'>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/home"><h4>Home Page</h4></Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    {data.profileImage && data.profileImage.contentType && data.profileImage.data && (
                      <MDBCardImage
                        src={`data:${data.profileImage.contentType};base64,${data.profileImage.data}`}
                        alt="Profile Image"
                        className="mt-4 mb-2 img-thumbnail"
                        fluid
                        style={{ width: '150px', zIndex: '0', height: '120px' }}
                      />
                    )}
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h5">{data.userName}</MDBTypography>
                    <MDBCardText>{data.city}</MDBCardText>
                  </div>
                </div>
                <div>
                  <Link to="/editprofile">
                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                      Edit profile
                    </MDBBtn>
                  </Link>
                </div>
                <div>
                  <Link to="/upload">
                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                      Uploads
                    </MDBBtn>
                  </Link>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{data.about}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Lives in {data.city}</MDBCardText>
                      <MDBCardText className="font-italic mb-0">{data.passion}</MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                    <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                  </div>
                  <MDBRow>
                    {data.postImages && data.postImages.length > 0 ? (
                      data.postImages.map((post, index) => (
                        <MDBCol key={index} className="mb-2">
                          {post && post.contentType && post.data && (
                            <MDBCardImage
                              src={`data:${post.contentType};base64,${post.data}`}
                              alt={`post-${index}`}
                              className="w-100 rounded-3"
                            />
                          )}
                        </MDBCol>
                      ))
                    ) : (
                      <MDBCol className="mb-2">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                          alt="default-post"
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
                    )}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Profile;
