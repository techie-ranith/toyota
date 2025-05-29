const mongoose = require("mongoose");

const vehiclePartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  partNumber: { type: String, required: true },
  manufacturer: { type: String },
  category: { type: String },
  price: { type: Number },
  stock: { type: Number },
});

const VehiclePart = mongoose.model("VehiclePart", vehiclePartSchema);

module.exports = VehiclePart;
