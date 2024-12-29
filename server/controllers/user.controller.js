import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const registerController = async (req, res) => {
    try {
        const {name, email, password} = req.body
        console.log(name, email, password)

        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })

        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in register controller",
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        generateToken(res, user, `Welcome back ${user.name}`)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in login controller",
            error
        })
    }
}