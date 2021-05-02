"use strict";

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async () => {
  const res = await Order.find({}, "number, status createDate")
    .populate("customer", "name email")
    .populate("items.product", "title price");
  return res;
};

exports.create = async (data) => {
  var order = new Order(data);
  const res = await order.save();
  return res;
};
