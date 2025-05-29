const BaseController = require("./BaseController");
const VehiclePart = require("../models/vehiclePartsModel");

class VehiclePartController extends BaseController {
  constructor() {
    super(VehiclePart);
  }

  // CRUD operations mapped to base class
  getAllVehicleParts(req, res) {
    return this.getAllItems(req, res);
  }

  getVehiclePartById(req, res) {
    const { id } = req.params;
    const isValid = this.validateId(id, res);
    if (isValid) return this.getSingleItem(id, res);
  }

  createVehiclePart(req, res) {
    return this.createNewItem(req.body, res);
  }

  updateVehiclePart(req, res) {
    const { id } = req.params;
    const isValid = this.validateId(id, res);
    if (isValid) return this.updateExistingItem(id, req.body, res);
  }

  deleteVehiclePart(req, res) {
    const { id } = req.params;
    const isValid = this.validateId(id, res);
    if (isValid) return this.deleteSingleItem(id, res);
  }

  deleteAllVehicleParts(req, res) {
    return this.deleteAllItems(req, res);
  }
}

module.exports = new VehiclePartController();
