import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
   (async()=>{
      const {data} = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    })();
  },[]);
  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {products.map(product => {
                return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product}/>
                </Col>
            })}
        </Row>
    </div>
  )
}

export default HomeScreen