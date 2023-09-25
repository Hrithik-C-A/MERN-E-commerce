import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress){
            navigate('/shipping')
        }else if (!cart.paymentMethod){
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>Column1</Col>
            <Col md={4}>Column2</Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen