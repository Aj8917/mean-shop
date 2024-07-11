import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} from
    '../../slices/usersApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Loader } from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const UserEditScreen = () => {

    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            
        }

    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedUser = (
           { 
            userId,
            name,
            email,
            isAdmin,
            }
        );

        try {
            const result = await updateUser(updatedUser);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('User Updated');
            navigate('/admin/userlist')
        }
        } catch (err) {
            toast.error(err?.data?.message || 'Something went wrong')
        }
        
    }

    
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {
                    isLoading ? <Loader /> : error ? <Message varient='danger'>
                        {error}
                    </Message> : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-2'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email' className='my-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isAdmin' className='my-2'>
                                
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                                
                            </Form.Group>

                            
                            <Button
                                type='submit'
                                variant='primary'
                                className='my-2'

                            >Update</Button>


                        </Form>
                    )
                }

            </FormContainer>


        </>
    )
}

export default UserEditScreen