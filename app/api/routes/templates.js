//requieres
const express = require("express");
const { NoEmitOnErrorsPlugin } = require("webpack");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const { default: Template } = require("../models/template.js");
//crud-endpoints
//get-templates
router.get("/templates", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const templates = await Template.find({ userId: userId });
    const toSend = {
      status: "success",
      data: templates,
    };
    return res.json(toSend);
  } catch (error) {
    console.log("ERROR - GET TEMPLATE".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});
//new-templates
router.post("/templates", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const newTemplate = req.body.template;
    newTemplate.userId = userId;
    newTemplate.createdTime = Date.now();
    const template = await Template.create(newTemplate);
    const toSend = {
      status: "success",
      data: newTemplate,
    };
    return res.json(toSend);
  } catch (error) {
    console.log("ERROR - CREATING NEW TEMPLATE".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});

//delete-Template
router.delete("/templates", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const templateId = req.query.templateId;
    const r = await Template.deleteOne({ userId: userId, _id: templateId });
    const toSend = {
      status: "success",
    };
    return res.json(toSend);
  } catch (error) {
    console.log("ERROR - DELETING NEW TEMPLATE".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});
//update-devices
router.put("/temlates", checkAuth, (req, res) => {
  const dId = req.body.dId;
  const userId = req.userData._id;
  if (selectTemplate(userId, dId)) {
    const toSend = {
      status: "success",
    };
    return res.json(toSend);
  } else {
    const toSend = {
      status: "error",
      error: "Device not found",
    };
    return res.status(500).json(toSend);
  }
});
//functions
function makeId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const selectTemplate = async (userId, dId) => {
  try {
    const resultMany = await Template.updateMany(
      { userId: userId },
      { selected: false }
    );
    const resultOne = await Template.updateOne(
      { userId: userId, dId: dId },
      { selected: true }
    );
    return true;
  } catch (error) {
    console.log("ERROR - SELECT TEMPLATE FUNCTION".red);
  }
};

module.exports = router;
