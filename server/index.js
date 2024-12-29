import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

// database connection
connectDb()

const app = express()

const PORT = process.env.PORT

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))

// api's
app.use("/api/v1/user", userRoute)

app.get("/test", (_, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is tested succefully"
    })
})

app.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`)
})