import bcrypt from 'bcryptjs';
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js'

//User Control
const authUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    const matchPassword = await bcrypt.compare(password, user.password);//There is also an alternative way to check password within the userModel.js

    if(user && matchPassword){
        generateToken(res, user._id);

        res.status(200).json({
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
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const hasedPassword = await bcrypt.hashSync(password, 10);

    const user = await User.create({
        name,
        email,
        password: hasedPassword
    });

    if(user){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        message: 'Logged out successfully'
    });
});

const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});
const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = await bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(400);
        throw new Error('User not found');
    }
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