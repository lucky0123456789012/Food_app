import { User } from '../models/userModel.js';

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;

        if (!userName || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: userName, email, password, phone'
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

        const existingUser = await User.findOne({ userName });
        const existingEmail = await User.findOne({ email });

        if (existingUser || existingEmail) {
            return res.status(400).json({
                success: false,
                message: `Duplicate key error: The userName (${userName}) or email (${email}) is already registered`
            });
        }

        const usernew = await User.create({ userName, email, password, phone, address });

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
                message: `Duplicate key error: This email or username is already registered`
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export { registerController };
