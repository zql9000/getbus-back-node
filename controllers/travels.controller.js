const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Travel = require('../models/Travel');

const listTravels = async (req, res = response) => {
  try {
    const travels = await Travel.find();

    return res.json({
      ok: true,
      travels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getTravel = async (req, res = response) => {
  try {
    const travelId = req.params.id;
    const travel = await Travel.findById(travelId);

    return res.json({
      ok: true,
      travel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newTravel = async (req, res = response) => {
  try {
    const existingTravel = await Travel.find({ name: req.body.name });

    if (existingTravel) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgTravelExists,
      });
    }

    const travel = new Travel(req.body);
    const insertedTravel = await travel.save();

    return res.status(201).json({
      ok: true,
      travel: insertedTravel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyTravel = async (req, res = response) => {
  try {
    const travelId = req.params.id;
    const existingTravel = await Travel.find({
      name: req.body.name,
      _id: { $ne: travelId },
    });

    if (existingTravel) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgTravelExists,
      });
    }

    const travel = await Travel.findById(travelId);

    if (!travel) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgTravelNotFound,
      });
    }

    const newTravel = { ...req.body };

    const updatedTravel = await Travel.findByIdAndUpdate(travelId, newTravel, {
      new: true,
    });

    return res.json({
      ok: true,
      travel: updatedTravel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteTravel = async (req, res = response) => {
  try {
    const travelId = req.params.id;
    const travel = await Travel.findById(travelId);

    if (!travel) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgTravelNotFound,
      });
    }

    const deletedTravel = await Travel.findByIdAndDelete(travelId);

    return res.json({
      ok: true,
      travel: deletedTravel,
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
  listTravels,
  getTravel,
  newTravel,
  modifyTravel,
  deleteTravel,
};
