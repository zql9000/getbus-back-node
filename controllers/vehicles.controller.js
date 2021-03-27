const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
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
        message:
          'A vehicle with this internNumber, transportCompanyId and vechicleTypeId already exists',
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
      message: 'Ask the administrator for information about this error',
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
      _id: { $not: { vehicleId } },
    });

    if (existingVehicle) {
      return res.status(409).json({
        ok: false,
        message:
          'A vehicle with this internNumber, transportCompanyId and vechicleTypeId already exists',
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        message: 'Vehicle not found',
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
      message: 'Ask the administrator for information about this error',
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
        message: 'Vehicle not found',
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
      message: 'Ask the administrator for information about this error',
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
