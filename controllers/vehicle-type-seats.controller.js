const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
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
      message: responseMessages.msgAskAdmin,
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
      message: responseMessages.msgAskAdmin,
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
        message: responseMessages.msgVehicleTypeSeatExists,
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
      message: responseMessages.msgAskAdmin,
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
      _id: { $ne: { vehicleTypeSeatId } },
    });

    if (existingVehicleTypeSeat) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgVehicleTypeSeatExists,
      });
    }

    const vehicleTypeSeat = await VehicleTypeSeat.findById(vehicleTypeSeatId);

    if (!vehicleTypeSeat) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgVehicleTypeSeatNotFound,
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
      message: responseMessages.msgAskAdmin,
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
        message: responseMessages.msgVehicleTypeSeatNotFound,
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
      message: responseMessages.msgAskAdmin,
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
