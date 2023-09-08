import React from 'react';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart, FaUser} from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);

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
              <Nav.Link href="/cart"><FaShoppingCart/> Cart {cartItems.length > 0 && (
                <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((acc, c)=>{
                     return acc + c.qty 
                    },0)}
                </Badge>
              )}</Nav.Link>
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