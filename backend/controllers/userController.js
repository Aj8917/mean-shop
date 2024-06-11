import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

//@desc Auth USer & get Token 
//@routes post /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
    //console.log(req.body); 
    // res.send('auth user');

    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {

        generateToken(user._id, res);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
})


//@desc Register User 
//@routes post /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    //res.send('registerr user')

    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {

        generateToken(user._id, res);
        res.status(201)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,

            });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})

//@desc Logout  User / clear cache 
//@routes post /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200)
        .json({ message: ' Logged Out Succesfully ' });
})


//@desc Get  User Profile 
//@routes get /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    //res.send(' Get user Profile')
    const user =await User.findById(req.user._id);

    if(user){
        res.status(200)
           .json({

           _id: user._id,
           name:user.name,
           email:user.email,
           isAdmin: user.isAdmin,

           })
    }else{
        res.status(404);
            throw new Error('User Not Found')
    }
})


//@desc Update  User Profile 
//@routes Put /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
   // res.send(' Update user Profile')
   const user = await User.findById(req.user._id);

   if(user){

    user.name =req.body.name || user.name;
    user.email =req.body.email || user.email;

    if(req.body.password){
        user.password =req.body.password;
    }

    const updateUser = await user.save();

    res.status(200)
       .json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin: user.isAdmin,

       })

   }else{
        res.status(404);
   }
})



//@desc Get  Users 
//@routes get /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send(' Get users ')
})


//@desc Get  User Profile 
//@routes get /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send(' Get user by Id')
})

//@desc Delete User 
//@routes DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send(' delete user')
})

//@desc Update User 
//@routes PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
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