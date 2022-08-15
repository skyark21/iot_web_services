//requieres
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

//models import
import User from "../models/user.js";

//Auth
//user register
router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      name: name,
      email: email,
      password: encryptedPassword,
    };
    const user = await User.create(newUser);
    console.log(user);
    const toSend = {
      status: "success",
    };
    res.json(toSend);
  } catch (error) {
    console.log("ERROR - REGISTER ENDPOINT".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    res.status(500).json(toSend);
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({ email: email });
    if (!user) {
      const toSend = {
        status: "error",
        error: "Invalid Credentials",
      };
      return res.status(401).json(toSend);
    }
    if (bcrypt.compareSync(password, user.password)) {
      user.set("password", undefined, { strict: false });
      const token = jwt.sign({ userData: user }, "securePasswordHere", {
        expiresIn: 60 * 60 * 24 * 30,
      });
      const toSend = {
        status: "success",
        token: token,
        userData: user,
      };
      console.log(toSend);
      return res.status(200).json(toSend);
    } else {
      const toSend = {
        status: "error",
        error: "Invalid Credentials",
      };
      return res.json(toSend);
    }
  } catch (error) {
    console.log("ERROR - LOGIN ENDPOINT".red);
    console.log(error);
  }
});

//POST -> req.body
//GET -> req.query

module.exports = router;
