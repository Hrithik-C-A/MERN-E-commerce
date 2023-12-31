import React,{ useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetProductDetailsQuery, useCreateReviewMutation, useUpdateProductReviewMutation, useDeleteProductReviewMutation } from '../slices/productsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { Row, Col, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Meta from '../components/Meta';
import ImageMagnifier from '../components/ImageMagnifier.jsx';
import { addToCart } from '../slices/cartSlice.js'


const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewId, setReviewId] = useState('');

    const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);

    const [createReview, { isLoading: loadingProductReview, }] = useCreateReviewMutation();

    const [updateReview, { isLoading: loadingReviewUpdate }] = useUpdateProductReviewMutation();

    const [deleteReview, { isLoading: loadingReviewDelete }] = useDeleteProductReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = ()=>{
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    };

    const reviewExists = useCallback((userId) => {
        return product.reviews.find(review => review.user === userId);
    }, [product?.reviews]);

    useEffect(() => {
        if(product && reviewExists(userInfo?._id)) {
            setRating(reviewExists(userInfo?._id)?.rating)
            setComment(reviewExists(userInfo?._id)?.comment);
            setReviewId(reviewExists(userInfo?._id)._id)
        }
    },[product, reviewExists, userInfo?._id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({ productId, rating, comment }).unwrap();
            refetch();
            toast.success('Review Submitted');
            setRating(0);
            setComment('');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    const reviewUpdateSubmitHandler = async (e) => {
        e.preventDefault();

        if (window.confirm('Are you sure want to update your review?')) {
            try {
                await updateReview({ productId ,reviewId, rating, comment }).unwrap();
                refetch();
                toast.success('Review Updated');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        } else {
            setRating(reviewExists(userInfo?._id)?.rating)
            setComment(reviewExists(userInfo?._id)?.comment);
        }
    };

    const deleteSubmitHandler = async (e) => {
        e.preventDefault();

        if (window.confirm('Are you sure want to delete your review?')) {
            try {
                await deleteReview({ productId, reviewId }).unwrap();
                refetch();
                toast.success('Review Deleted');
                setReviewId('');
                setRating('');
                setComment('');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }

    };

  return (
    <>
      <Link className='btn btn-dark text-light my-3' to='/'>Go Back</Link>
      { isLoading ? (
        <Loader/>
      ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
      :
       (<>
       <Meta title={product.name} description={product.description}/>
        <Row>
        <Col md={5}>
            <ImageMagnifier src={product.image} alt={product.name} height={'auto'} width={'100%'} />
        </Col>
        <Col md={4}>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                                <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                                      {[...Array(product.countInStock).keys()].map(x => {
                                        return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                      })}  
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' variant='dark' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
      <Row className='review my-2'>
            <Col md={6}>
                <h2 className='border p-2 rounded'>Reviews</h2>
                { product.reviews.length === 0 && <Message>No Reviews</Message> }
                <ListGroup variant='flush'>
                    { product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    )) }
                    <ListGroup.Item>
                        { loadingProductReview && <Loader/> }
                        { loadingReviewUpdate && <Loader/>}
                        { userInfo ? ( reviewExists(userInfo._id) ? 
                            (
                                <>
                            <h2 className='border p-2 rounded'>Edit Your Review</h2>   
                            <Form onSubmit={ reviewUpdateSubmitHandler }>
                                <Form.Group controlId='rating' className='my-2'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='comment' className='my-2'>
                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <div className='d-flex justify-content-between'>
                                    <Button type='submit' variant='dark' disabled={loadingReviewUpdate}>Update</Button>

                                    <Button type='button' variant='danger' disabled={loadingReviewDelete} onClick={deleteSubmitHandler}>Delete</Button>
                                </div>
                            </Form>
                            </> 
                            ) : (
                            <>
                            <h2 className='border p-2 rounded'>Write a Customer Review</h2>   
                            <Form onSubmit={ submitHandler }>
                                <Form.Group controlId='rating' className='my-2'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='comment' className='my-2'>
                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='dark' disabled={loadingProductReview}>Submit</Button>
                            </Form>
                            </>)
                        ) : (
                            <Message>
                                Please <Link to='/login'>Sign in</Link> to write a review{' '}
                            </Message>
                        ) }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
      </Row>
       </>) }
    </>
  )
}

export default ProductScreen