import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import  Home  from '../Pages/Home';
import { CreateAccount } from '../Pages/CreateAccount';
import { Login} from '../Pages/Login';
import Deposit from '../Pages/Deposit';
import Withdraw from '../Pages/Withdraw';
import { AllData }  from '../Pages/AllData';
import UserContext from './UserContext';

function NavBar () {
  const ctx = React.useContext(UserContext); 
  const onLogout = () => {
    ctx.loggedInUser = ""
    window.location.href("/")
  }
    return (
        <BrowserRouter>
        <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Bad Bank</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/createaccount">Create Account</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
              <Nav.Link as={Link} to="/withdraw">Withdraw</Nav.Link>
              <Nav.Link as={Link} to="/"><span onClick={onLogout}>Logout</span></Nav.Link>
              <Nav.Link as={Link} to="/alldata">All Data</Nav.Link>
              
            </Nav>
          </Container>
        </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/createAccount" element={<CreateAccount />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/deposit" element={<Deposit />}/>
            <Route path="/withdraw" element={<Withdraw />}/>
            <Route path="/alldata" element={<AllData />}/>
            
          </Routes>
        </div>
      </BrowserRouter>
    );
}

export default NavBar;