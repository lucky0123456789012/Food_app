import { User } from '../models/userModel.js';
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

// Register Controller
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, userType } = req.body;
 
        if (!userName || !email || !password || !phone ||!userType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: userName, email, password, phone, userType'
            });
        }

        if (!userName.trim()) {
            return res.status(400).json({
                success: false,
                message: 'userName cannot be empty or spaces only'
            });
        }

   // Log values to debug
        console.log("Checking if user exists with:", userName, email);

        // Check if user already exists (by username or email)
        const existingUser = await User.findOne({ 
            $or: [{ userName }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username or email is already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const usernew = await User.create({ userName, email, password: hashedPassword, phone, address, userType });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: usernew
        });

    } catch (error) {
        console.error("MongoDB Error:", error);

        if (error.code === 11000) {  // Handling duplicate key error
            return res.status(400).json({
                success: false,
                message: "Duplicate key error: This email or username is already registered"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email or password is missing"
            });
        }

        // Check if user exists
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        //JWT token
        const token = JWT.sign({id:user._id, userType: user.userType, userName: user.userName,}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.log("Error in login:", error);
        res.status(500).send({
            success: false,
            message: "Error in login API"
        });
    }
};

export { registerController, loginController };