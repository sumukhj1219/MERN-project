import mongoose, {Schema} from "mongoose";

const useSchema = new Schema(
	{
	 username:{
		type: String,
		required: true, 
		trim: true,
		lowercase: true,
		unique: true,
		index: true
	 },
	 email:{
		type: String,
		required: true,
		lowercase: true,
		trim: true
	 },
	 fullname:{
		type: String,
		required: true,
		trim: true,
		index: true
	 },
	 avatar:{
		type: String,
		required: true
	 },
	 coverimage:{
		type: String,
	 },
	 password:{
		type: String,
		required: [true, "Password is invalid"]
	 },
	 watchHistory:{
		type: Schema.Types.ObjectId,
		ref: "Video"
	 },
	 refreshTokens:{
		type: String,
	 },
	},
	{
		timestamps: true,
	}
	)

export const User = mongoose.model("User", userSchema);