import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
	try {
		await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
		console.log("CONNECTED SUCCESSFULLY")
	} catch (error) {
		console.log("ERROR:", error);
		process.exit(1);
	}
}
export default connectDB;