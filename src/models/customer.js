"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  ],
});

module.exports = mongoose.model("Customer", customerSchema);
