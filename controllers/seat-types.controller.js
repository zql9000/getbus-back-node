const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const SeatType = require('../models/SeatType');

const listSeatTypes = async (req, res = response) => {
  try {
    const seatTypes = await SeatType.find();

    return res.json({
      ok: true,
      seatTypes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getSeatType = async (req, res = response) => {
  try {
    const seatTypeId = req.params.id;
    const seatType = await SeatType.findById(seatTypeId);

    return res.json({
      ok: true,
      seatType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newSeatType = async (req, res = response) => {
  try {
    const existingSeatType = await SeatType.find({ name: req.body.name });

    if (existingSeatType) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgSeatTypeExists,
      });
    }

    const seatType = new SeatType(req.body);
    const insertedSeatType = await seatType.save();

    return res.status(201).json({
      ok: true,
      seatType: insertedSeatType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifySeatType = async (req, res = response) => {
  try {
    const seatTypeId = req.params.id;
    const existingSeatType = await SeatType.find({
      name: req.body.name,
      _id: { $ne: { seatTypeId } },
    });

    if (existingSeatType) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgSeatTypeExists,
      });
    }

    const seatType = await SeatType.findById(seatTypeId);

    if (!seatType) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSeatTypeNotFound,
      });
    }

    const newSeatType = { ...req.body };

    const updatedSeatType = await SeatType.findByIdAndUpdate(
      seatTypeId,
      newSeatType,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      seatType: updatedSeatType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteSeatType = async (req, res = response) => {
  try {
    const seatTypeId = req.params.id;
    const seatType = await SeatType.findById(seatTypeId);

    if (!seatType) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSeatTypeNotFound,
      });
    }

    const deletedSeatType = await SeatType.findByIdAndDelete(seatTypeId);

    return res.json({
      ok: true,
      seatType: deletedSeatType,
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
  listSeatTypes,
  getSeatType,
  newSeatType,
  modifySeatType,
  deleteSeatType,
};
