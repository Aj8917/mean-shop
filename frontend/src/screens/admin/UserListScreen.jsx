import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheckDouble, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import {toast} from 'react-toastify';
import { useGetUsersQuery,useDeleteUserMutation } from '../../slices/usersApiSlice'

const UserListScreen = () => {
    
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser , {isLoading:loadingDelete}]   = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if(window.confirm('Are You Sure ? ')){
            try {
                await deleteUser(id);
                toast.success('User delete');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
        
    }

    return (
        <>

            <h1>Users</h1>
            {loadingDelete && <Loader />}
            {
                isLoading ? <Loader /> : error ? <Message varient='danger'>{error}
                </Message> : (
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`} >{user.email} </a></td>
                                   
                                    <td>
                                        {
                                            user.isAdmin ? (
                                                    <FaCheckDouble style={{ color: 'green' }} />
                                            ) : (
                                                    <FaTimes style={{ color: 'red' }} />
                                            )
                                        }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                                            <Button className='btn-sm' varient='light'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                            <Button 
                                                    className='btn-sm' 
                                                    varient='danger'
                                                    onClick={()=>deleteHandler(user._id)}
                                            >
                                                <FaTrash style={{color : 'white'}}/>
                                            </Button>
                                        
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

export default UserListScreen