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

    useSchema.pre("save", async function(next){
		if(!this.isModified("password")) return next();
		this.password = bcrypt.hash(this.password, 10);
		next()
	})

	useSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password);
	}

	useSchema.methods.generateAccessToken = function(){
		return jwt.sign(
			{
				_id: this._id,
				email: this.email,
				username: this.username,
				fullname: this.fullname
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: ACCESS_TOKEN_EXPIRY
			}
		)
	}

	useSchema.methods.generateAccessToken = function(){
		return jwt.sign(
			{
				_id: this._id,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TOKEN_EXPIRY
			}
		)
	}


	useSchema.methods.generateRefreshToken = function(){}



export const User = mongoose.model("User", useSchema);