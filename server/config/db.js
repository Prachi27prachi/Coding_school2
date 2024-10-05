import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const db = await mongoose.connect(process.env.MONGO_URL);
       console.log('Connecting to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default connectDB