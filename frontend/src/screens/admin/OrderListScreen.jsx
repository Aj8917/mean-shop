import React from 'react'
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import { Button, Table} from 'react-bootstrap';
import {FaCheckDouble, FaTimes} from 'react-icons/fa';
import Message from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
const OrderListScreen = () => {
  const {data :orders , isLoading ,error } = useGetOrdersQuery();


  return (
    <>
       <h1>Orders</h1> 
       {
        isLoading ? <Loader /> : error ? <Message varient='danger'>{error}
          </Message> : (
             <Table striped  hover responsive className='table-sm'>
             <thead>
                 <tr>
                 <th>ID</th>
                 <th>DATE</th>
                 <th>TOTAL</th>
                 <th>PAID</th>
                 <th>DELIVERED</th>
                 <th></th>
                 </tr>
             </thead>
             <tbody>
                 {orders.map((order)=>(
                     <tr key={order._id}>
                         <td>{order._id}</td>
                         <td>{order.createdAt.substring(0, 10)}</td>
                         <td>${order.totalPrice}</td>
                         <td>
                              {
                                     order.isPaid ?
                                     (order.paidAt.substring(0,10))
                                     :(
                                                 <FaTimes style={{ color: 'red'}}/>
                                        )
                             }
                         </td>
                         <td>
                         {
                                     order.isDeliverd ? (
                                        typeof order.isDeliverd === 'string' ? (
                                            order.isDeliverd.substring(0, 10)
                                        ) : (
                                            <FaCheckDouble style={{ color: 'green' }}/>
                                            
                                        )
                                    ) : (
                                        <FaTimes style={{ color: 'red' }}/>
                                    )
                             }
                         </td>
                         <td>
                             <LinkContainer to={`/order/${order._id}`}>
                              <Button className='btn-sm' varient='light'>
                                 Details
                              </Button>
                             </LinkContainer>
                         </td>
                     </tr>
                 ))}
             </tbody>
         </Table>
          )
       }
    </>
  )
}

export default OrderListScreen