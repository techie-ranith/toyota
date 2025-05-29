const express = require("express");
const router = express.Router();
const vehiclePartController = require("../controllers/vehiclePartController");

// All CRUD routes
router.get("/", vehiclePartController.getAllVehicleParts.bind(vehiclePartController));
router.get("/:id", vehiclePartController.getVehiclePartById.bind(vehiclePartController));
router.post("/", vehiclePartController.createVehiclePart.bind(vehiclePartController));
router.put("/:id", vehiclePartController.updateVehiclePart.bind(vehiclePartController));
router.delete("/:id", vehiclePartController.deleteVehiclePart.bind(vehiclePartController));
router.delete("/", vehiclePartController.deleteAllVehicleParts.bind(vehiclePartController));

module.exports = router;
