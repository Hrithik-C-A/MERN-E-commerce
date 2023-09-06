import React from 'react';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart, FaUser} from 'react-icons/fa';

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand className='px-2' href="/">E-commerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 px-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to='/cart'>
              <Nav.Link href="/cart"><FaShoppingCart/> Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link href="/login"><FaUser/> Signin</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header