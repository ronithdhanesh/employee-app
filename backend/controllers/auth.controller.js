const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const registerUser = async(req, res) =>{
    try {
        const {name, email, password, role} = req.body;
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message : "Account already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            name : name,
            email: email,
            password : hashedPassword,
            role : role
        })

        const accessToken = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role : user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
        );

        const refreshToken = jwt.sign(
        {
            userId: user._id
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: "7d"
        }
        );

        return res.status(201).json({
            message: "User registered successfully",
            user : user,
            accessToken, 
            refreshToken
        });



    } catch(err){
        res.status(400).json(err)
    }
    
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role :  user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
    } catch(err){
        res.status(400).json(err)
    }
}

const getUsers = async(req, res) =>{
    try {
        const users = await UserModel.find().populate("department").select("-password");
        return res.status(200).json(users)
    } catch(err){
        res.status(400).json(err)
    }
}

const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId)
      .populate("department", "name code") 
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error fetching profile data" });
  }
};


const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token missing",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET
    );

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.json({
      accessToken,
    });
  } catch {
    return res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};


module.exports = {registerUser, loginUser, refreshAccessToken, getUsers, getMe}