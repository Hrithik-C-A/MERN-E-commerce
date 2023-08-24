import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import products from '../products'
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {products.map(product => {
                return <Col sm={12} md={6} lg={4} xl={3}>
                   <Product product={product}/>
                </Col>
            })}
        </Row>
    </div>
  )
}

export default HomeScreen