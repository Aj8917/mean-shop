import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js';


//@desc Auth USer & get Token 
//@routes post /api/users/login
//@access Public

const authUser = asyncHandler(async(req ,res)=>{
     res.send('auth user');
})


//@desc Register User 
//@routes post /api/users/
//@access Public
const registerUser = asyncHandler(async (req,res)=>{
    res.send('registerr user')
})

//@desc Logout  User / clear cache 
//@routes post /api/users/logout
//@access Private
const logoutUser =asyncHandler(async (req,res)=>{
    res.send(' user Logout')
})


//@desc Get  User Profile 
//@routes get /api/users/profile
//@access Private
const getUserProfile =asyncHandler(async (req,res)=>{
    res.send(' Get user Profile')
})


//@desc Update  User Profile 
//@routes Put /api/users/profile
//@access Private
const updateUserProfile =asyncHandler(async (req,res)=>{
    res.send(' Update user Profile')
})



//@desc Get  Users 
//@routes get /api/users
//@access Private/Admin
const getUsers =asyncHandler(async (req,res)=>{
    res.send(' Get users ')
})


//@desc Get  User Profile 
//@routes get /api/users/:id
//@access Private/Admin
const getUserById =asyncHandler(async (req,res)=>{
    res.send(' Get user by Id')
})

//@desc Delete User 
//@routes DELETE /api/users/:id
//@access Private/Admin
const deleteUser =asyncHandler(async (req,res)=>{
    res.send(' delete user')
})

//@desc Update User 
//@routes PUT /api/users/:id
//@access Private/Admin
const updateUser =asyncHandler(async (req,res)=>{
    res.send(' Update  user')
})

export {
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        getUsers,
        deleteUser,
        getUserById,
        updateUser
}