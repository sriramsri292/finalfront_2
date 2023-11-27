import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './explore.css';
import {Routes,Route, Link } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import News from "./News/news";
import Nav from 'react-bootstrap/Nav';

export default function Explore() {
  


  return (
    <div className="Ef">
      <div  >
      <Nav justify variant="tabs" defaultActiveKey="/home" className="Eh" >
      <Nav.Item>
        
         <Link to="/news"><h4>"What's Happening Worldwide?"</h4>  </Link>
      </Nav.Item>
      <Nav.Item>
      <Link to ="/rain"><h4> Does It Rain !</h4></Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/astro"><h4>Find Your Soul Mate </h4></Link>
      </Nav.Item>
      
    </Nav>
      </div>
      <div >
  <Container className="Ev">
    <Row>
      <Col >
      <img src="https://i.pinimg.com/564x/40/38/24/4038247f180219a09a17e6f6b0d78842.jpg" alt="img" style={{ maxWidth: "100%" ,height:"140%"}}/>
      </Col>
      <Col>
      <img src="https://i.pinimg.com/564x/a6/5b/4c/a65b4cbdbeab074432f1fdd53bb9bc50.jpg" alt="imgg" style={{ maxWidth: "100%" ,height:"140%" }} />
      </Col>
      <Col>
      <img src="https://i.pinimg.com/564x/cd/9a/3d/cd9a3d33a727a5188e3b11c4f3500207.jpg" alt="imggg" style={{ maxWidth: "100%",height:"140%" }} />
      </Col>
    </Row>
  </Container>
</div>

      <div>
      <Routes> 
        <Route path="/news" element={ <News/>} />
      </Routes>
      </div>
    </div>
  );
}

/* 

      <h2>Latest News</h2>
      <Container className="Ec">
      <Row xs={1} md={3} className="g-4">
        {newsData.map((data, index) => (
          <Col key={index}>
            <Card>
              <Card.Img
                variant="top"
                src={data.urlToImage || "https://t3.ftcdn.net/jpg/06/19/67/84/240_F_619678475_Fymmlu8WFBI2x6DjKhyuOW3euE9Byioj.jpg"}
              />
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.description}</Card.Text>
                <Card.Text>{data.publishedAt}</Card.Text>
                <Button variant="primary" href={data.url} target="_blank">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>

*/