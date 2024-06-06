import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Row>
      <Col>
        <h1 style={{ marginBottom: '20%' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to='/'>GO BACK</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>Items</ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default CartScreen;
