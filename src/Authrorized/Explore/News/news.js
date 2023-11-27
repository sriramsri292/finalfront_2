
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './news.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";



export default function News(){

    const [newsData, setNewsData] = useState([]); // Initialize newsData state as an empty array

    useEffect(() => {
      const url =
        "https://newsapi.org/v2/top-headlines?" +
        "country=in&" +
        "apiKey=e7c31c435fc945ee9943008a24b6fb2b";
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the API response to the console
          setNewsData(data.articles); // Update the newsData state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Log any errors
        });
    }, []);

    return(

        <div className="Na"> 

        
        <div> 

        <Nav justify variant="tabs" defaultActiveKey="/home" className="Eh" >
        <Nav.Item  >
        
     
          <Link to='/home'> 
        <Button variant="outline-secondary" style={{ background: "#FFDAB9" }}
>

  <div>
    <img width="49" height="49" src="https://img.icons8.com/3d-plastilina/69/home--v2.png" alt="home--v2" />
  </div>
  <div>
    <h3>Home</h3>
  </div>
  </Button>{' '}
  </Link>
         

      </Nav.Item>
      <Nav.Item>
      <Link to="/news">
      <Button variant="outline-info" style={{marginTop:"30px"}}>
      "Top Headlines"
        </Button>{' '}
        </Link>
      </Nav.Item>
      
      <Nav.Item>
        <Link to="/business">
        <Button variant="outline-info" style={{marginTop:"30px"}}>
        "Business" 
        </Button>{' '}
        </Link>
      </Nav.Item>
      <Nav.Item>
        
        <Link to="/entertainment">
        <Button variant="outline-info" style={{marginTop:"30px"}}>

        "Entertainment"
        </Button>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to ="/sports">
        <Button variant="outline-info" style={{marginTop:"30px"}}>
        "Sports"
        </Button>
        </Link>

      </Nav.Item>
      <Nav.Item>
        <Link to ="/health">
        <Button variant="outline-info" style={{marginTop:"30px"}}>
        "Health Is Wealth !"
        </Button>
        </Link>
      </Nav.Item>
      
    </Nav>
        </div>
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
        </div>


    );
}