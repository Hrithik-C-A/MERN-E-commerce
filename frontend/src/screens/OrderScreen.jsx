import React from 'react'
import { Link, useParams } from 'react-router-dom';
import useRazorpay from 'react-razorpay';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, useGetRazorpayClientIdQuery, useVerifyOrderInRazorpayMutation, usePayOrderMutation } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const {id: orderId } = useParams();
    const [Razorpay] = useRazorpay();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    const { data: clientId } = useGetRazorpayClientIdQuery();
    const [ verifyOrder ] = useVerifyOrderInRazorpayMutation();
    const [ payOrder ] = usePayOrderMutation();

    const initPayment = (data) => {

        const options = {
            key: clientId,
            amount: `${data?.orderInfo?.amount}`,
            currency: `${data?.orderInfo?.currency}`,
            name: "Ecommerce",
            description: "This is a ecommerce app",
            image: "https://example.com/your_logo",
            order_id: data?.orderInfo?.id,
            handler: async (res) => {
             const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
             try {
                const verify = await verifyOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature});
                await payOrder({ orderId: orderId, details: { 
                    order_id: razorpay_order_id, 
                    pay_id: razorpay_payment_id, 
                    pay_signature: razorpay_signature, 
                    email: data?.user?.email, 
                    status: 'success'} 
                });
                toast.success(`${verify.data.message} Payment Successful.`);
                refetch();
             } catch (error) {
                toast.error('Payment Failed.');
             }

            },
            prefill: {
              name: data?.user?.name,
              email: data?.user?.email,
              contact: "",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
      
          const rzpay = new Razorpay(options);
          rzpay.open();
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            initPayment(order);
        } catch (error) {
         console.log(error);   
        }
    };

  return (
    isLoading ? (<Loader/>) : 
    ( error ? (<Message variant='danger'/>) : (
        <>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '} {order.shippingAddress.country} 
                            </p>
                            {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>                        

                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        { !order.isPaid && (
                            <ListGroup.Item>
                                { <div>
                                    <Button className='bg-dark' onClick={handlePayment}>Pay Now</Button>
                                </div> }
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </>
      )
    )
  )
}

export default OrderScreen