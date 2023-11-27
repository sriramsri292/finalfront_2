import './rain.css';
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



import {
  MDBCard,

  MDBCardImage,
  MDBCol,
  MDBContainer,

  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Rain() {
  const [weatherData, setWeatherData] = useState({}); // Initialize weatherData state as an empty object

  const [city,setCity]=useState(null);

  const fetchData = () => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=f8f96ba10f43464abd6151656230711&q=${city || 'dharapuram'}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

function handell(e){
  setCity(e.target.value);
}


  return (
    <div className='RRRR'> 
    <div className="RRa">
      <div className='Rn'> 
      <Navbar className="bg-body-tertiary" >
        <Container >
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://img.icons8.com/3d-fluency/94/cloud.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <h7> Weather Report</h7>
          </Navbar.Brand>
        </Container>
      </Navbar>
      </div>
      <div className='RRf'> 
      <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter the city " value={city} onChange={handell} />
        <Form.Text className="text-muted">
          Know your City weather ...
        </Form.Text>
      </Form.Group>
     <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>

    
   <div className='RRR'> 
      <section className="vh-100" >
        <MDBContainer className="h-100" >
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard
                className="bg-dark text-white"
                style={{ borderRadius: "40px" }}
              >
                <div className="bg-image" style={{ borderRadius: "35px" }}>
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                    className="card-img"
                    alt="weather"
                  />
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(190, 216, 232, .5)" }}
                  ></div>
                </div>
                <div className="card-img-overlay text-dark p-5">
                  <MDBTypography tag="h4" className="mb-0">
                    {weatherData.location?.name}, {weatherData.location?.region}, {weatherData.location?.country}
                  </MDBTypography>
                  <p className="display-2 my-3">{weatherData.current?.temp_c}°C</p>
                  <MDBTypography tag="h5">{weatherData.current?.condition?.text}</MDBTypography>
                  <p className="mb-2">
                    Feels Like: <strong>{weatherData.current?.feelslike_c}°C</strong>
                  </p>
                  <p>Wind: {weatherData.current?.wind_kph} km/h, {weatherData.current?.wind_dir}</p>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      </div>
      <div  className='Rt '> 

      <Table responsive className="table-responsive table-responsive-sm Rt">
        <thead>
          <tr>
            <th>#</th>
            <th>Cloud</th>
            <th>Humidity</th>
            <th>Gust_kph</th>
            <th>Precip_mm</th>
            <th>Pressure_in</th>
            <th>UV</th>
            <th>vis_km</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{weatherData.current?.cloud}</td>
            <td>{weatherData.current?.humidity}</td>
            <td>{weatherData.current?.gust_kph}</td>
            <td>{weatherData.current?.precip_mm}</td>
            <td>{weatherData.current?.pressure_in}</td>
            <td>{weatherData.current?.uv}</td>
            <td>{weatherData.current?.vis_km}</td>
          </tr>
          </tbody>
      </Table>
      </div>
    </div>
    </div>
  );
}
