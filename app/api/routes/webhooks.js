//requires
const express = require("express");
const axios = require("axios");
const colors = require("colors");
const { route } = require("..");
const router = express.Router();

//endpoints
//post
router.post("/webhooks-saver", async (req, res) => {
  const data = req.body;
  console.log(colors.yellow(data.m));
  res.json("{}");
});

module.exports = router;
