import React from 'react'
//import products from '../products'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Rating } from '../components/Rating'
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { useGetPoductsDetailsQuery } from '../slices/productsApiSlice'
import { Loader } from '../components/Loader'
import Messsage from '../components/Messsage'

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

                                            <ListGroup.Item>
                                                <Button
                                                    className='btn-block'
                                                    type='button'
                                                    disabled={product.countInStock === 0}

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
