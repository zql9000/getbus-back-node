const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Seat = require('../models/Seat');

const listSeats = async (req, res = response) => {
  try {
    const seats = await Seat.find().populate('seatTypeId');

    return res.json({
      ok: true,
      seats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getSeat = async (req, res = response) => {
  try {
    const seatId = req.params.id;
    const seat = await Seat.findById(seatId).populate('seatTypeId');

    return res.json({
      ok: true,
      seat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newSeat = async (req, res = response) => {
  try {
    const existingSeat = await Seat.find({ number: req.body.number });

    if (existingSeat) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgSeatExists,
      });
    }

    const seat = new Seat(req.body);
    const insertedSeat = await seat.save();

    return res.status(201).json({
      ok: true,
      seat: insertedSeat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifySeat = async (req, res = response) => {
  try {
    const seatId = req.params.id;
    const existingSeat = await Seat.find({
      number: req.body.number,
      _id: { $ne: seatId },
    });

    if (existingSeat) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgSeatExists,
      });
    }

    const seat = await Seat.findById(seatId);

    if (!seat) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSeatNotFound,
      });
    }

    const newSeat = { ...req.body };

    const updatedSeat = await Seat.findByIdAndUpdate(seatId, newSeat, {
      new: true,
    });

    return res.json({
      ok: true,
      seat: updatedSeat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteSeat = async (req, res = response) => {
  try {
    const seatId = req.params.id;
    const seat = await Seat.findById(seatId);

    if (!seat) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSeatNotFound,
      });
    }

    const deletedSeat = await Seat.findByIdAndDelete(seatId);

    return res.json({
      ok: true,
      seat: deletedSeat,
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
  listSeats,
  getSeat,
  newSeat,
  modifySeat,
  deleteSeat,
};
