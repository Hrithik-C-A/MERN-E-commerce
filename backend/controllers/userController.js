import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

//User Control
const authUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    const matchPassword = await bcrypt.compare(password, user.password);//There is also an alternative way to check password within the userModel.js

    if(user && matchPassword){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
const registerUser = asyncHandler(async(req, res)=>{
    res.json('register user');
});
const logoutUser = asyncHandler(async(req, res)=>{
    res.json('logout user');
});
const getUserProfile = asyncHandler(async(req, res)=>{
    res.json('get user profile');
});
const updateUserProfile = asyncHandler(async(req, res)=>{
    res.json('update user profile');
});

//Admin Control
const getUsers = asyncHandler(async(req, res)=>{
    res.json('get all users profile');
});
const getUserById = asyncHandler(async(req, res)=>{
    res.json('get all user profile by ID');
});

const deleteUser = asyncHandler(async(req, res)=>{
    res.json('delete user profile');
});

const updateUserById = asyncHandler(async(req, res)=>{
    res.json('update user profile');
});

export { authUser,
         registerUser,
         logoutUser,
         getUserProfile,
         updateUserProfile,
         getUsers,
         getUserById,
         deleteUser,
         updateUserById   
        };