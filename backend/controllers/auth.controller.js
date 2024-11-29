import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async(req, res) => {
  try {
    const {fullName, username, password, confirmPassword, gender} = req.body;
    if(password !== confirmPassword) return res.status(400).json({error:"Password does not match."})

      const user = await User.findOne({username});
      if(user) return res.status(400).json({error:"Username already exists."})

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyAvatar : girlAvatar
      });

      if(newUser){
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic
        })
      } else {
        res.status(400).json({error:"Invalid user data."})
      }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Something went wrong."});
  }
}
export const login = async(req, res) => {
  try {

    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordValid = await bcrypt.compare(password, user?.password || "");

    if(user && isPasswordValid){
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic
      })
    } else {
      res.status(400).json({error:"Invalid username or password."})
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Something went wrong."});
  }
}
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0,});
    res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Something went wrong."});
    
  }
}