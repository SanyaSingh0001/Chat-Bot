import httpStatus from 'http-status';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs'; // ✅ Corrected import for file system

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            
            return res.status(httpStatus.OK).json({
                token: token,
                user: {
                    name: user.name,
                    username: user.username,
                    avatar: user.avatar,
                    location: user.location // ✅ Frontend ko location bhi bhej rahe hain
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Error logging in: ${e.message}` });
    }
}

const register = async (req, res) => {
    console.log("Received registration data:", req.body);
    
    // 1. lat aur lng ko destructure karein
    const { name, username, password, lat, lng } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            if (req.file) fs.unlinkSync(req.file.path); // ✅ Fixed unlink
            return res.status(httpStatus.CONFLICT).json({ message: "Username already exists" });
        }

        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar is required" });
        }

        const cloudinaryResponse = await uploadOnCloudinary(avatarLocalPath);
        if (!cloudinaryResponse) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. New User with GeoJSON Location
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            avatar: cloudinaryResponse.secure_url,
            // ✅ MongoDB GeoJSON structure
            location: {
                type: "Point",
                coordinates: [parseFloat(lng), parseFloat(lat)] // [Longitude, Latitude]
            }
        });

        await newUser.save();
        return res.status(httpStatus.CREATED).json({ message: "User registered successfully with location" });

    } catch (err) {
        // Error aane par bhi local file delete karein agar bachi ho
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(500).json({ message: `Error registering user: ${err.message}` });
    }
}

export { login, register };