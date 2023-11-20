import mongoose from "mongoose";

const connectDB = async ()=>{
	try {
		await mongoose.connect("mongodb://localhost:27017/portfolio");
		console.log("CONNECTED SUCCESSFULLY")
	} catch (error) {
		console.log("ERROR:", error);
		process.exit(1);
	}
}
export default connectDB;