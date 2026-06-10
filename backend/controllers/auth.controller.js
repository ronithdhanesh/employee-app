const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const registerUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
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
            password : hashedPassword
        })

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            message: "User registered successfully",
            user : user,
            token
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
                email: user.email
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


module.exports = {registerUser, loginUser}