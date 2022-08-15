import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  userId: { type: String, required: [true] },
  name: { type: String, unique: true, required: [true] },
  description: { type: String },
  createdTime: { type: Date, required: [true] },
  widgets: { type: Array, default: [] },
});

//validator
templateSchema.plugin(uniqueValidator, {
  message: "Error, Template Identification already in exist.",
});

//convert to model
const Template = mongoose.model("Template", templateSchema);

export default Template;
