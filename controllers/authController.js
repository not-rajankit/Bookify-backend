import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration
export const register = async (req, res) => {
  // hashing password

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    usertype: req.body.usertype,
    role: req.body.role,
    // email:req.body.email,
    password: hash,
    // photo:req.body.photo
  });
  try {
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully  Created!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// user login
export const login = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });

    // it user does not exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // if user exists then check the password or compare the password

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password, role, ...rest1 } = user._doc;

    const tmp = {
      role: role,
    };
    const rest = { ...rest1, ...tmp };

    // creating jwt token

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // set token in the browser cookies and send the response to the client
    // console.log(token);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in",
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login.",
    });
  }
};
