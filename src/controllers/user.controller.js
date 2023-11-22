import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js'
import {uploadToCloud} from '../utils/cloudinary.js'

const registerUser = asyncHandler(async(req, res)=>{
    const {fullName, email, username, password} = req.body;
    
	if([fullName, email, username, password].some((fields)=>fields?.trim===""))
	{
	   throw new ApiError(400, "All fields are required")
	}

    const existUser = await User.findOne({
		$or: [{username}, {email}]
	})

	if(existUser)
	{
		throw new ApiError(400, "User already exist")
	}
	
    const avatarLocalPath = req.fields?.avatar[0]?.path
	const coverLocalPath = req.fields?.avatar[0]?.path

	if(!avatarLocalPath){
		throw new ApiError(400, "Avatar File is required")
	}

	const avatar = await uploadToCloud(avatarLocalPath)
	const coverImage = await uploadToCloud(coverLocalPath)

	if(!avatar){
		throw new ApiError(400, 'Avatar file is required')
	}
    
	const user = await User.create({
		fullName,
		avatar: avatar.url,
		coverImage: coverImage?.url||"",
		email,
		password,
		username: username.toLowercase()
	})

    const createdUser = User.findById(user._id).select("-password -refreshToken");

	if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});

export {registerUser}