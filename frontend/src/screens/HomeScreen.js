import React from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
        { isLoading ? 
        (<h2>Loading...</h2>) 
        :
         error ? (<div>{error?.data?.message|| error.error}</div>) : 
         (<>
          <h1>Latest Products</h1>
          <Row>
              {products.map(product => {
                  return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                     <Product product={product}/>
                  </Col>
              })}
          </Row>
          </>)}

    </>
  )
}

export default HomeScreen