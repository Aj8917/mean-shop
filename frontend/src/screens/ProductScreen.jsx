import React from 'react'
import { useState } from 'react';
//import products from '../products'
import { useNavigate,useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {
      Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form, } from 'react-bootstrap'
import { Rating } from '../components/Rating'
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { useGetPoductsDetailsQuery } from '../slices/productsApiSlice'
import { Loader } from '../components/Loader'
import Messsage from '../components/Messsage'
import { addToCart } from '../slices/cartSlice';

export const ProductScreen = () => {
    // const [product, setProduct] = useState(null);
    const { id: productId } = useParams();
    // const product = products.find(
    //     (p) => p._id === productId
    // )
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const { data } = await axios.get(`/api/products/${productId}`);
    //             setProduct(data);
    //         } catch (error) {
    //             console.error('Error fetching the product:', error);
    //         }
    //     };
    //     fetchProduct();
    // }, [productId]);
    // Check if product is not loaded yet
    // if (!product) {
    //     return <div>Loading...</div>; // Show a loading Messsage or spinner
    // }
    // //console.log(product);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [qty, setQty] = useState(1);
   
  
    const addToCartHandler = () => {
      dispatch(addToCart({ ...product, qty }));
      navigate('/cart');
    };
   
    const { data: product, isLoading, error } = useGetPoductsDetailsQuery(productId);
    return (

        <>

            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>

            {
                isLoading ? (<Loader />)
                    : error ? (
                        <Messsage varient='danger'>
                            {error?.data.Messsage || error.error}
                        </Messsage>)
                        : (
                            <Row>
                                <Col md={5}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                <Col md={4}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating
                                                value={product.rating}
                                                text={`${product.numReviews}`}
                                            />
                                        </ListGroup.Item>

                                        <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

                                        <ListGroup.Item>Description :{product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price :</Col>
                                                    <Col>
                                                        <strong>
                                                            ${product.price}
                                                        </strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {
                                                            product.countInStock > 0 ? 'In Stock' :
                                                                'Out Of Stock'
                                                        }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {/* Qty Select */}
                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                value={qty}
                                                                onChange={(e) => setQty(Number(e.target.value))}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    className='btn-block'
                                                    type='button'
                                                    disabled={product.countInStock === 0}
                                                    onClick={addToCartHandler}
                                                >
                                                    Add To Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                </Col>
                            </Row>


                        )}

        </>
    )
}
