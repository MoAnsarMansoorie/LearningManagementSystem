import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
        success: false,
        message: "Internal Server Error SignUp",
        error
    });
  }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        generateToken(res, user, "User logged in successfully");

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error Login",
            error
        });
    }
}
