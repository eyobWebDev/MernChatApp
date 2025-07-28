import mongoose from "mongoose"
import {config } from "dotenv"
config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.LOCAL_MONGODB_URI)
        console.log(`mongo db connected on ${conn.connection.host}`)
    } catch (e) {
        console.log("Error while connecting: "+ e)
    }
}