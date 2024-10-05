import userModel from '../models/userModel.js';
import {hashPassword, comparePassword} from '../helper/userHelper.js';
import JWT from 'jsonwebtoken';

// Sign up 
export const signUpController = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        // validation
        if (!fullname || !email || !password) {
          return res.status(404).send({
            success: false,
            message: "Please fill all the fields",
          });
        }
    
        // Check User
        const existingUser = await userModel.findOne({ email });
        // Existing User
        if (existingUser) {
          return res.status(200).send({
            success: false,
            message: "User already exists",
          });
        }
    
        // Register User
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
          fullname,
          email,
          password: hashedPassword,
        }).save();
    
        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
    
        res
          .status(201)
          .send({
            success: true,
            message: `Welcome ${user.name}`,
            user,
            token,
          });

      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while Sign Up",
        });
      }
};

// Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
          return res
            .status(404)
            .send({ success: false, message: "Invalid email or password" });
        }
    
        // Check User
        const user = await userModel.findOne({ email });
        if (!user) {
          return res
            .status(404)
            .send({ success: false, message: "Email does not exist" });
        }
    
        // compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }
    
        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
    
        res.status(200).send({
          success: true,
          message: `Welcome back ${user.name}`,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while Login",
          error,
        });
      }
};