import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import './astro.css';
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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const Astro = () => {
  const [n, setN] = useState({
    name: '',
    dob: '',
    name1: '',
    dob1: ''
  });

  const [D, setD] = useState([]);
  const [responseReceived, setResponseReceived] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob" || name === "dob1") {
      // Convert the date to MM/DD/YYYY format
      const dateParts = value.split("-");
      const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
      setN((prevData) => ({ ...prevData, [name]: formattedDate }));
    } else {
      setN((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const fetchData = async () => {
    const url = "https://starlovematch.p.rapidapi.com/api/";
    const birthdetails = `name=${n.name}&dob=${n.dob}&name1=${n.name1}&dob1=${n.dob1}&sort=O&NC=C&ryr=2023&details=N&coupon=12345678`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a0d14709e1msh2d2192f0c3b5757p15b73fjsn2b67d5926074",
        "X-RapidAPI-Host": "starlovematch.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `${url}?birthdetails=${encodeURIComponent(birthdetails)}`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      console.log("Response text:", result);

      // Parse the response text as JSON
      const data = JSON.parse(result);
      setD(data);
      console.log("Parsed data:", data);
      console.log("the ", D);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("the ", D);
  }, [D]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchData();
      setResponseReceived(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="AAA">
      <div>
        <img className="AA" src="https://wallpapercave.com/wp/wp2344841.jpg" alt="img" />
      </div>
   
      <Container style={{ marginRight: "17%" }} className="AAc">
        <Row>
          <Col>
          {!responseReceived && (
            <Form onSubmit={handleSubmit}>
              <MDBContainer fluid={true}>
                <MDBCard
                  className="text-black m-5"
                  style={{ borderRadius: "25px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol
                        md="10"
                        lg="6"
                        className="order-2 order-lg-1 d-flex flex-column align-items-center"
                      >
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Love Score
                        </p>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <MDBIcon fas icon="user me-3" size="lg" />
                          <MDBInput
                            label="Your Name"
                            id="form1"
                            type="text"
                            className="w-100"
                            name="name"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <MDBIcon fas icon="envelope me-3" size="lg" />
                          <MDBInput
                            label="Your D.O.B"
                            id="form2"
                            type="date"
                            name="dob"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <MDBIcon fas icon="user me-3" size="lg" />
                          <MDBInput
                            label="Partner Name"
                            id="form3"
                            type="text"
                            className="w-100"
                            name="name1"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <MDBIcon fas icon="envelope me-3" size="lg" />
                          <MDBInput
                            label="Partner D.O.B"
                            id="form4"
                            type="date"
                            name="dob1"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <MDBCheckbox
                            name="flexCheck"
                            value=""
                            id="flexCheckDefault"
                            label="Verify Details"
                          />
                        </div>

                        <MDBBtn
                          id="submit-button"
                          className="mb-4"
                          size="lg"
                          type="submit"
                        >
                          Register
                        </MDBBtn>
                      </MDBCol>

                      <MDBCol
                        md="10"
                        lg="6"
                        className="order-1 order-lg-2 d-flex align-items-center"
                      >
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
            </Form>
            )}
               {responseReceived && (
        <div>
          <Table responsive="sm" className="AAt">
          <thead>
          <tr >
            <th>#</th>
            <th style={{background:"black",color:"white"}}><h2>Details</h2></th>
            <th style={{background:"black",color:"white"}}><h2>Result</h2></th>
            
          </tr>
          </thead>
          <tbody>
          <td>1</td>
            <td ><h3 style={{color:"brown"}}> Name</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}>{D[0].name}</h3></td>
          </tbody>
          <tbody>
          <td>1</td>
            <td><h3 style={{color:"brown"}}>Love</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}>{D[0].love} </h3></td>
          </tbody>
          <tbody>
          <td>1</td>
            <td><h3 style={{color:"brown"}}> Intellectual</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}>{D[0].intellectual}</h3></td>
          </tbody>
          <tbody>
          <td>1</td>
            <td><h3 style={{color:"brown"}}>Physical</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}> {D[0].physical}</h3></td>
          </tbody>
          <tbody>
          <td>1</td>
            <td><h3 style={{color:"brown"}}>Strength</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}>{D[0].strength}</h3></td>
          </tbody>
          <tbody>
          <td>1</td>
            <td><h3 style={{color:"brown"}}> Overall</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}>{D[0].overall}</h3></td>
          </tbody>
          <tbody>
          <td>1</td>
            <td><h3 style={{color:"brown"}}>Bad</h3></td>
            <td><h3 style={{background:"brown",color:"black"}}>{D[0].bad}</h3></td>
          </tbody>
       
          </Table>
        </div>
      )}
            
          </Col>
          
          <Col xs={4}>
     
            </Col>
        </Row>
      </Container>
      
       
   
    </div>
  );
};

export default Astro;
