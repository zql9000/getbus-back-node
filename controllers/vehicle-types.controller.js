const { response } = require('express');
const VehicleType = require('../models/VehicleType');

const listVehicleTypes = async (req, res = response) => {
  try {
    const vehicleTypes = await VehicleType.find();

    return res.json({
      ok: true,
      vehicleTypes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const getVehicleType = async (req, res = response) => {
  try {
    const vehicleTypeId = req.params.id;
    const vehicleType = await VehicleType.findById(vehicleTypeId);

    return res.json({
      ok: true,
      vehicleType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newVehicleType = async (req, res = response) => {
  try {
    const existingVehicleType = await VehicleType.find({ name: req.body.name });

    if (existingVehicleType) {
      return res.status(409).json({
        ok: false,
        message: 'A vehicleType with this name already exists',
      });
    }

    const vehicleType = new VehicleType(req.body);
    const insertedVehicleType = await vehicleType.save();

    return res.status(201).json({
      ok: true,
      vehicleType: insertedVehicleType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyVehicleType = async (req, res = response) => {
  try {
    const vehicleTypeId = req.params.id;
    const existingVehicleType = await VehicleType.find({
      name: req.body.name,
      _id: { $not: { vehicleTypeId } },
    });

    if (existingVehicleType) {
      return res.status(409).json({
        ok: false,
        message: 'A vehicleType with this name already exists',
      });
    }

    const vehicleType = await VehicleType.findById(vehicleTypeId);

    if (!vehicleType) {
      return res.status(404).json({
        ok: false,
        message: 'VehicleType not found',
      });
    }

    const newVehicleType = { ...req.body };

    const updatedVehicleType = await VehicleType.findByIdAndUpdate(
      vehicleTypeId,
      newVehicleType,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      vehicleType: updatedVehicleType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteVehicleType = async (req, res = response) => {
  try {
    const vehicleTypeId = req.params.id;
    const vehicleType = await VehicleType.findById(vehicleTypeId);

    if (!vehicleType) {
      return res.status(404).json({
        ok: false,
        message: 'VehicleType not found',
      });
    }

    const deletedVehicleType = await VehicleType.findByIdAndDelete(
      vehicleTypeId
    );

    return res.json({
      ok: true,
      vehicleType: deletedVehicleType,
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
  listVehicleTypes,
  getVehicleType,
  newVehicleType,
  modifyVehicleType,
  deleteVehicleType,
};
