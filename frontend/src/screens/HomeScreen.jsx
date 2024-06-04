import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Loader } from '../components/Loader';
/*
    import axios from 'axios';
    import { useEffect,useState } from 'react';
    import products from '../products'
import { Product } from '../components/Product'
*/


import Product from '../components/Product';
import Messsage from '../components/Messsage';
export const HomeScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();
    // const [products , setProducts]= useState([]);

    // useEffect(()=>{
    //     const fetchProducts =async()=>{
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data);
    //     };

    //     fetchProducts();
    // },[]);



    return (
        <>
            {
                isLoading ? (<Loader />)
                : error ? (
                    <Messsage varient='danger'>
                        {error?.data.Messsage || error.error}
                    </Messsage>
                )
                : (
                        <>

                            <h1>Latest Products</h1>
                            <Row>
                                {
                                    products.map((product) => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))
                                }
                            </Row>


                        </>
                    )
            }

        </>
    )
}
