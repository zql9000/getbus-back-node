const { response } = require('express');
const Person = require('../models/Person');
const Passenger = require('../models/Passenger');
const { responseMessages } = require('../helpers/spanishMessages');

const listPassengers = async (req, res = response) => {
  try {
    const passengers = await Passenger.find().populate('personId');

    return res.json({
      ok: true,
      passengers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getPassenger = async (req, res = response) => {
  try {
    const passengerId = req.params.id;
    const passenger = await Passenger.findById(passengerId).populate(
      'personId'
    );

    return res.json({
      ok: true,
      passenger,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newPassenger = async (req, res = response) => {
  try {
    const existingPassenger = await Passenger.findOne({
      documentTypeId: req.body.documentTypeId,
      documentNumber: req.body.documentNumber,
    });

    if (existingPassenger) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgPassengerExists,
      });
    }

    const person = new Person(req.body);
    const insertedPerson = await person.save();
    req.body.personId = insertedPerson._id;

    const passenger = new Passenger(req.body);
    const insertedPassenger = await passenger.save();

    return res.status(201).json({
      ok: true,
      passenger: insertedPassenger,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyPassenger = async (req, res = response) => {
  try {
    const passengerId = req.params.id;
    const existingPassenger = await Passenger.findOne({
      documentTypeId: req.body.documentTypeId,
      documentNumber: req.body.documentNumber,
      _id: { $ne: passengerId },
    });

    if (existingPassenger) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgPassengerExists,
      });
    }

    const passenger = await Passenger.findById(passengerId);

    if (!passenger) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgPassengerNotFoud,
      });
    }

    const newPassenger = { ...req.body };

    await Person.findByIdAndUpdate(passenger.personId, newPassenger);
    const updatedPassenger = await Passenger.findByIdAndUpdate(
      passengerId,
      newPassenger,
      {
        new: true,
      }
    ).populate('personId');

    return res.json({
      ok: true,
      passenger: updatedPassenger,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deletePassenger = async (req, res = response) => {
  try {
    const passengerId = req.params.id;
    const deletedPassenger = await Passenger.findByIdAndDelete(passengerId);

    if (!deletedPassenger) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgPassengerNotFoud,
      });
    }

    const deletedPerson = await Person.findByIdAndDelete(
      deletedPassenger.personId
    );

    return res.json({
      ok: true,
      passenger: { ...deletedPassenger, person: deletedPerson },
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
  listPassengers,
  getPassenger,
  newPassenger,
  modifyPassenger,
  deletePassenger,
};
