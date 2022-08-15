import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  userId: { type: String, required: [true] },
  dId: { type: String, unique: true, required: [true] },
  name: { type: String, requiered: [true] },
  selected: { type: Boolean, required: [true], default: true },
  templateId: { type: String, required: [true] },
  templateName: { type: String, required: [true] },
  createdTime: { type: Date },
});

//validator
deviceSchema.plugin(uniqueValidator, {
  message: "Error, Device Identification already in use.",
});

//convert to model
const Device = mongoose.model("Device", deviceSchema);

export default Device;
