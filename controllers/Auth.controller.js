import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashed,
    });

    req.session.user = user;

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

export const login = async (req, res, next) => {
  console.log('What is this?');
  
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "invalid credentials",
      });
    }

    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return res.status(400).json({
        status: "fail",
        message: "invalid credentials",
      });
    }

    req.session.user = user

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
