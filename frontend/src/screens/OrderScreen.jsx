import React from 'react'
import { Row, Col, ListGroup, Image, Card, Button,  } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import { Loader } from '../components/Loader' // Assuming Loader is a default export
import {
    useGetOrderDetailsQuery,
    useDeliverOrderMutation
} from '../slices/orderApiSlice'
import {  useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { userInfo } = useSelector((state) => state.auth);
    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [deliverOrder , { isLoading: loadingDeliver}] = useDeliverOrderMutation();

    const deliverOrderHandler = async () =>{
        try { 
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        }catch(err){
            toast.error(err?.data?.message || err.message);
        }
    }
    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error.message}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name :</strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email :</strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Address :</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not Paid
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
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
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* PAY ORDER PLACEHOLDER */}

                            {
                                loadingDeliver && <Loader />
                            }

                            {
                                userInfo && userInfo.isAdmin  &&
                                !order.isDeliverd &&(
                                    <ListGroup.Item>

                                       <Button type='button' className='btn btn-block'
                                                onClick={deliverOrderHandler}>
                                                    
                                            Mark As Deliverd            
                                        </Button> 

                                    </ListGroup.Item>
                                )

                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen;
