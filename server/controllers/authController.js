import User from "../models/User";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";
import { sign } from "node:crypto";

//Generate JWT token
const generateTtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Register user
export const register = async (req, res) => {
  try {
    //user details
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });

    //Check if User exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist!" });

      //Hash password
      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10),
      );

      //Create user
      const user = await User.create({ name, email, password: hashedPassword });
      const token = generateToken(user._id);
      return res.status(201).json({ success: true, token, user });
    }
  } catch (error) {
    console.error("Register error: ", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

//Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    //find user
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({success: false, message: "Invalid User Credentials!"});


    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({success: false, message:"Your password was incorrect!"});
    }
    //Create use
    const token = generateToken(user._id);
    return res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.error("Register error: ", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if(!user){
      return res.status(400).json({success: false, message: "User not found"});
    }
    res.json({success: true, user});
  } catch (error) {
    console.error("Register error: ", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};
