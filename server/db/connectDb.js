import mongoose from "mongoose"

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connected successfully`)
        
    } catch (error) {
        console.log(`Database error occured`, error)
    }
}

export default connectDb