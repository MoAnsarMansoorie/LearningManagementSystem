import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"

dotenv.config()

// database connection
connectDb()

const app = express()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`)
})