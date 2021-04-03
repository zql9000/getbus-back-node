const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const BusTicket = require('../models/BusTicket');

const listBusTickets = async (req, res = response) => {
  try {
    const busTickets = await BusTicket.find();

    return res.json({
      ok: true,
      busTickets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getBusTicket = async (req, res = response) => {
  try {
    const busTicketId = req.params.id;
    const busTicket = await BusTicket.findById(busTicketId);

    return res.json({
      ok: true,
      busTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newBusTicket = async (req, res = response) => {
  try {
    const existingBusTicket = await BusTicket.findOne({
      passengerId: req.body.passengerId,
      invoiceId: req.body.invoiceId,
    });

    if (existingBusTicket) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgBusTicketExists,
      });
    }

    const busTicket = new BusTicket(req.body);
    busTicket.busTicketNumber = Date.now();
    const insertedBusTicket = await busTicket.save();

    return res.status(201).json({
      ok: true,
      busTicket: insertedBusTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyBusTicket = async (req, res = response) => {
  try {
    const busTicketId = req.params.id;
    const existingBusTicket = await BusTicket.findOne({
      passengerId: req.body.passengerId,
      invoiceId: req.body.invoiceId,
      _id: { $ne: busTicketId },
    });

    if (existingBusTicket) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgBusTicketExists,
      });
    }

    const busTicket = await BusTicket.findById(busTicketId);

    if (!busTicket) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgBusTicketNotFoud,
      });
    }

    const newBusTicket = { ...req.body };

    const updatedBusTicket = await BusTicket.findByIdAndUpdate(
      busTicketId,
      newBusTicket,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      busTicket: updatedBusTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteBusTicket = async (req, res = response) => {
  try {
    const busTicketId = req.params.id;
    const deletedBusTicket = await BusTicket.findByIdAndDelete(busTicketId);

    if (!deletedBusTicket) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgBusTicketNotFoud,
      });
    }

    return res.json({
      ok: true,
      busTicket: deletedBusTicket,
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
  listBusTickets,
  getBusTicket,
  newBusTicket,
  modifyBusTicket,
  deleteBusTicket,
};
