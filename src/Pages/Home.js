import React from 'react';
import { Card } from 'react-bootstrap';
import {Row} from "react-bootstrap";






function Home () {

  return (
    <Row className="justify-content-md-center">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src='https://media.istockphoto.com/vectors/bank-building-isolated-on-white-background-vector-illustration-flat-vector-id900791430?k=20&m=900791430&s=612x612&w=0&h=IKTkhxiIwAL6-HMfm9tfW6ti2e4V2roX2IgpUUrbLME=' alt="bank"/>
        <Card.Body>
          <Card.Title>Bad Bank</Card.Title>
          <Card.Text>
            Welcome to Bad Bank! 
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>   
    );
}


export default Home;