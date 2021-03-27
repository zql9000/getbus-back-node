const { response } = require('express');
const VehicleTypeSeat = require('../models/VehicleTypeSeat');

const listVehicleTypeSeats = async (req, res = response) => {
  try {
    const vehicleTypeSeats = await VehicleTypeSeat.find();

    return res.json({
      ok: true,
      vehicleTypeSeats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const getVehicleTypeSeat = async (req, res = response) => {
  try {
    const vehicleTypeSeatId = req.params.id;
    const vehicleTypeSeat = await VehicleTypeSeat.findById(vehicleTypeSeatId);

    return res.json({
      ok: true,
      vehicleTypeSeat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newVehicleTypeSeat = async (req, res = response) => {
  try {
    const existingVehicleTypeSeat = await VehicleTypeSeat.find({
      floor: req.body.floor,
      locationX: req.body.locationX,
      locationY: req.body.locationY,
    });

    if (existingVehicleTypeSeat) {
      return res.status(409).json({
        ok: false,
        message:
          'A vehicleTypeSeat with this floor, locationX and locationY already exists',
      });
    }

    const vehicleTypeSeat = new VehicleTypeSeat(req.body);
    const insertedVehicleTypeSeat = await vehicleTypeSeat.save();

    return res.status(201).json({
      ok: true,
      vehicleTypeSeat: insertedVehicleTypeSeat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyVehicleTypeSeat = async (req, res = response) => {
  try {
    const vehicleTypeSeatId = req.params.id;
    const existingVehicleTypeSeat = await VehicleTypeSeat.find({
      floor: req.body.floor,
      locationX: req.body.locationX,
      locationY: req.body.locationY,
      _id: { $not: { vehicleTypeSeatId } },
    });

    if (existingVehicleTypeSeat) {
      return res.status(409).json({
        ok: false,
        message:
          'A vehicleTypeSeat with this floor, locationX and locationY already exists',
      });
    }

    const vehicleTypeSeat = await VehicleTypeSeat.findById(vehicleTypeSeatId);

    if (!vehicleTypeSeat) {
      return res.status(404).json({
        ok: false,
        message: 'VehicleTypeSeat not found',
      });
    }

    const newVehicleTypeSeat = { ...req.body };

    const updatedVehicleTypeSeat = await VehicleTypeSeat.findByIdAndUpdate(
      vehicleTypeSeatId,
      newVehicleTypeSeat,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      vehicleTypeSeat: updatedVehicleTypeSeat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteVehicleTypeSeat = async (req, res = response) => {
  try {
    const vehicleTypeSeatId = req.params.id;
    const vehicleTypeSeat = await VehicleTypeSeat.findById(vehicleTypeSeatId);

    if (!vehicleTypeSeat) {
      return res.status(404).json({
        ok: false,
        message: 'VehicleTypeSeat not found',
      });
    }

    const deletedVehicleTypeSeat = await VehicleTypeSeat.findByIdAndDelete(
      vehicleTypeSeatId
    );

    return res.json({
      ok: true,
      vehicleTypeSeat: deletedVehicleTypeSeat,
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
  listVehicleTypeSeats,
  getVehicleTypeSeat,
  newVehicleTypeSeat,
  modifyVehicleTypeSeat,
  deleteVehicleTypeSeat,
};
