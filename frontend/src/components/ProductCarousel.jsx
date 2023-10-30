import React from 'react'
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? '' : error ? <Message variant='danger'>{error}</Message> : 
    (
        <Carousel pause='hover' style={{background: 'rgba(0, 0, 0, 0.5'}} className=' mb-4'>
            { products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link className='text-decoration-none' to={`/product/${product._id}`}>
                        <div className='d-flex'>
                        <Image src={product.image} alt={product.name} fluid/>
                        <p className='mx-1 text-light text-center d-none d-lg-block mt-5'>{product.description}</p>
                        </div>
                        <Carousel.Caption style={{width: '100%', background: 'rgba(0, 0, 0, 0.5)'}} className='position-absolute start-0 bottom-0 end-0'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            )) }
        </Carousel>
    )
}

export default ProductCarousel