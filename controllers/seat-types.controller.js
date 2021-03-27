const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newSeatType = async (req, res = response) => {
  try {
    const existingSeatType = await SeatType.find({ name: req.body.name });

    if (existingSeatType) {
      return res.status(409).json({
        ok: false,
        message: 'A seatType with this name already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifySeatType = async (req, res = response) => {
  try {
    const seatTypeId = req.params.id;
    const existingSeatType = await SeatType.find({
      name: req.body.name,
      _id: { $not: { seatTypeId } },
    });

    if (existingSeatType) {
      return res.status(409).json({
        ok: false,
        message: 'A seatType with this name already exists',
      });
    }

    const seatType = await SeatType.findById(seatTypeId);

    if (!seatType) {
      return res.status(404).json({
        ok: false,
        message: 'SeatType not found',
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
      message: 'Ask the administrator for information about this error',
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
        message: 'SeatType not found',
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
      message: 'Ask the administrator for information about this error',
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
