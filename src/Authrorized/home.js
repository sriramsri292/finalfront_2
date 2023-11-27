import React from "react";
import './home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import HomeUser from "./homeUser";

export default function Home()
{
  

return (
<div >
    
<Container className="Ha">
  
      <Row>
      <Col className="Hc">
      <Button variant="outline-secondary">

  <div>
    <img width="49" height="49" src="https://img.icons8.com/3d-plastilina/69/home--v2.png" alt="home--v2" />
  </div>
  <div>
    <h3>Home</h3>
  </div>
  </Button>{' '}
  </Col>
        
     

      
      <Col className="Hc">
        <Link to='/search'>
      <Button variant="outline-secondary">

  <div>
  <img width="49" height="49" src="https://img.icons8.com/external-wanicon-flat-wanicon/64/external-search-user-interface-wanicon-flat-wanicon.png" alt="external-search-user-interface-wanicon-flat-wanicon"/>
  </div>
  <div>
    <h3>Search</h3>
  </div>
  </Button>{' '}
  </Link>
  </Col>
        
      
      
      <Col className="Hc">
        <Link to='/explore'> 
      <Button variant="outline-secondary">

  <div>
  <img width="49" height="49" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-world-womens-day-wanicon-lineal-color-wanicon.png" alt="external-world-womens-day-wanicon-lineal-color-wanicon"/>
  </div>
  <div>
    <h3>Explore</h3>
  </div>
  </Button>{' '}
  </Link>
  </Col>
     

     
      <Col className="Hc">
        <Link to="/notify"> 
      <Button variant="outline-secondary">

  <div>
  <img width="49" height="49" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-notification-web-flaticons-lineal-color-flat-icons-6.png" alt="external-notification-web-flaticons-lineal-color-flat-icons-6"/>
  </div>
  <div>
    <h3>Notify !</h3>
  </div>
  </Button>{' '}
  </Link>
  </Col>
        
      
    
      <Col className="Hc">
        <Link to="/message">  
      <Button variant="outline-secondary">

  <div>
  <img width="49" height="49" src="https://img.icons8.com/external-wanicon-flat-wanicon/64/external-message-happy-new-year-wanicon-flat-wanicon.png" alt="external-message-happy-new-year-wanicon-flat-wanicon"/>
  </div>
  <div>
    <h3>Message</h3>
  </div>
  </Button>{' '}
  </Link>
  </Col>
        
     
     
      <Col className="Hc">
        <Link to="/profile"> 
      <Button variant="outline-secondary">

  <div>
  <img width="49" height="49" src="https://img.icons8.com/external-fauzidea-flat-fauzidea/64/external-user-user-interface-fauzidea-flat-fauzidea.png" alt="external-user-user-interface-fauzidea-flat-fauzidea"/>
  </div>
  <div>
    <h3>User Profile</h3>
  </div>
  </Button>{' '}
  </Link>
  </Col>
        
   </Row>
   <Row className="HHr"> 
  <Col> <HomeUser/></Col>
   </Row>
    </Container>









</div>





);


}
