import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async ()=>{
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        dispatch(resetCart());
        navigate('/login')
      } catch (error) {
        console.log('error', error);
      }
  };

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
            className="ms-auto my-2 mx-5 px-1 my-lg-0"
            style={{ height: 'auto' }}
            navbarScroll
          >
            <SearchBox/>
            <LinkContainer to='/cart'>
              <Nav.Link href="/cart"><FaShoppingCart/> Cart {cartItems.length > 0 && (
                <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((acc, c)=>{
                     return acc + c.qty 
                    },0)}
                </Badge>
              )}</Nav.Link>
            </LinkContainer>
            { userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link href="/login"><FaUser/> Sign In</Nav.Link>
                  </LinkContainer>
            )}
            { userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header