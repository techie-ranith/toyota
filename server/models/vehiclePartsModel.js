const mongoose = require("mongoose");

const vehiclePartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  partType: [{ type: String }],
  brand: { type: String },
  quantity: { type: Number },
  price: { type: String },
  status: [{
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  }],
});

const VehiclePart = mongoose.model("VehiclePart", vehiclePartSchema);

module.exports = VehiclePart;
