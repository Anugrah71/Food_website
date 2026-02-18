const Joi = require("joi");
const crypto = require("crypto");
const passwordRestToken = require("../models/passwordRestToekn.model");
const User = require("../models/user.model");
require("dotenv").config();
const generateTokens = require("../utils/generateTokens").default;
const {
  signUpBodyValidation,
  logInBodyValidation,
} = require("../utils/validationSchema");
const sendEmail = require("../utils/sendEmail");

const bcrypt = require("bcryptjs");

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
};
exports.registerNewUser = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      console.log("Here is the problme", error);

      return res.status(400).json({ errors: true, message: error.details[0] });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User exist");
      return res
        .status(400)
        .json({ error: true, message: "User with given email already exis" });
    }
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password, salt);

    const NewUser = await new User({
      name: req.body.name,
      password: hassPassword,
      email: req.body.email,
      location: req.body.location,
      role: req.body.role,
    }).save();
    const { accessToken, refreshToken } = await generateTokens(NewUser);
    setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({
      error: false,
      message: "Account created successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = logInBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    // const userData = await User.findOne({ email });
    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!verifiedPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });
    const { accessToken, refreshToken } = await generateTokens(user);

    setRefreshTokenCookie(res, refreshToken);

    res
      .status(200)
      .json({ error: false, accessToken, message: "Logged in successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

exports.sendRestPassLink = async (req, res) => {
  try {
    const Schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = Schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json("User with given email doesn't exist");

    let token = await passwordRestToken.findOne({ userId: user._id });
    if (!token) {
      token = await new passwordRestToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `http://localhost:5000/api/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);
    res.status(200).json("password reset link sent to your email account");
  } catch (err) {
    res.send("An error occured");
    console.log(err);
  }
};

exports.passwordRest = async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await passwordRestToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hassPassword;
    await user.save();
    await passwordRestToken.deleteOne({ userId: user._id });
    res.send("password reset sucessfully.");
  } catch (err) {
    res.send("An error occured");
    console.log(err);
  }
};
