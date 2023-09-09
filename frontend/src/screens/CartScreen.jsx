import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import  Form  from 'react-bootstrap/Form';
import  ListGroup  from 'react-bootstrap/ListGroup';
import  Image  from 'react-bootstrap/Image';
import  Button  from 'react-bootstrap/Button';
import  Card  from 'react-bootstrap/Card';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const addToCartHandler = async(product, qty)=>{
        dispatch(addToCart({...product,qty}))
    };
  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
            { cartItems.length === 0 ? (
                <Message>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    { cartItems.map((item)=>{
                       return <ListGroup.Item>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link className='text-black' to={`/product/${item.id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                    <Form.Control as='select' value={item.qty} onChange={(e)=> addToCartHandler(item, Number(e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x => {
                                            return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        })}  
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light'><FaTrash/></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    }) }
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Cart Subtotal <span style={{ fontWeight: 'normal' }} >({cartItems.reduce((acc, item)=> acc + item.qty, 0)} items) :</span> 
                        </h2>
                        <h5>
                        ${ cartItems.reduce((acc, item)=> acc + item.qty*item.price,0).toFixed(2) }
                        </h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block bg-dark' disabled={cartItems.length === 0}>Procceed To Checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen