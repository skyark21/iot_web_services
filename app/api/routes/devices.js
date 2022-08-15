//requieres
const express = require("express");
const { NoEmitOnErrorsPlugin } = require("webpack");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
const { default: Device } = require("../models/device.js");
//crud-endpoints
//get-devices
router.get("/devices", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const devices = await Device.find({ userId: userId });
    const toSend = {
      status: "success",
      data: devices,
    };
    return res.json(toSend);
  } catch (error) {
    console.log("ERROR - GET DEVICES".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});

//new-devices
router.post("/devices", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    let newDevice = req.body.newDevice;
    console.log(newDevice);
    newDevice.userId = userId;
    newDevice.createdTime = Date.now();
    const device = await Device.create(newDevice);
    const toSend = {
      status: "success",
      data: newDevice,
    };
    return res.json(toSend);
  } catch (error) {
    console.log("ERROR - CREATING NEW DEVICE".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});

//delete-devices
router.delete("/devices", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const dId = req.query.dId;
    console.log(userId);
    console.log(dId);
    const result = await Device.deleteOne({ userId: userId, dId: dId });
    if (result.deletedCount == 0) {
      const toSend = {
        status: "error",
        message: "Non existing device",
      };
      console.log("ERROR - NON EXISTING DEVICE".red);
      console.log(toSend);
      return res.status(500).json(toSend);
    }
    const toSend = {
      status: "success",
      data: result,
    };
    return res.json(toSend);
  } catch (error) {
    console.log("ERROR - DELETING DEVICE".red);
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    return res.status(500).json(toSend);
  }
});

//update-devices
router.put("/devices", checkAuth, (req, res) => {
  const dId = req.body.dId;
  const userId = req.userData._id;
  if (selectDevice(userId, dId)) {
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
const selectDevice = async (userId, dId) => {
  try {
    const resultMany = await Device.updateMany(
      { userId: userId },
      { selected: false }
    );
    const resultOne = await Device.updateOne(
      { userId: userId, dId: dId },
      { selected: true }
    );
    return true;
  } catch (error) {
    console.log("ERROR - SELECT DEVICE FUNCTION".red);
  }
};

module.exports = router;
