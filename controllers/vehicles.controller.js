const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Vehicle = require('../models/Vehicle');

const listVehicles = async (req, res = response) => {
  try {
    const vehicles = await Vehicle.find();

    return res.json({
      ok: true,
      vehicles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getVehicle = async (req, res = response) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);

    return res.json({
      ok: true,
      vehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newVehicle = async (req, res = response) => {
  try {
    const existingVehicle = await Vehicle.find({
      internNumber: req.body.internNumber,
      transportCompanyId: req.body.transportCompanyId,
      vechicleTypeId: req.body.vechicleTypeId,
    });

    if (existingVehicle) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgVehicleExists,
      });
    }

    const vehicle = new Vehicle(req.body);
    const insertedVehicle = await vehicle.save();

    return res.status(201).json({
      ok: true,
      vehicle: insertedVehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyVehicle = async (req, res = response) => {
  try {
    const vehicleId = req.params.id;
    const existingVehicle = await Vehicle.find({
      internNumber: req.body.internNumber,
      transportCompanyId: req.body.transportCompanyId,
      vechicleTypeId: req.body.vechicleTypeId,
      _id: { $ne: vehicleId },
    });

    if (existingVehicle) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgVehicleExists,
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgVehicleNotFound,
      });
    }

    const newVehicle = { ...req.body };

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      newVehicle,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteVehicle = async (req, res = response) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgVehicleNotFound,
      });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    return res.json({
      ok: true,
      vehicle: deletedVehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

module.exports = {
  listVehicles,
  getVehicle,
  newVehicle,
  modifyVehicle,
  deleteVehicle,
};
