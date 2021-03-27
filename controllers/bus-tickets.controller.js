const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newBusTicket = async (req, res = response) => {
  try {
    const existingBusTicket = await BusTicket.find({
      passengerId: req.body.passengerId,
      invoiceId: req.body.invoiceId,
    });

    if (existingBusTicket) {
      return res.status(409).json({
        ok: false,
        message:
          'A busTicket with this passengerId and invoiceId already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyBusTicket = async (req, res = response) => {
  try {
    const busTicketId = req.params.id;
    const existingBusTicket = await BusTicket.find({
      passengerId: req.body.passengerId,
      invoiceId: req.body.invoiceId,
      _id: { $not: { busTicketId } },
    });

    if (existingBusTicket) {
      return res.status(409).json({
        ok: false,
        message:
          'A busTicket with this passengerId and invoiceId already exists',
      });
    }

    const busTicket = await BusTicket.findById(busTicketId);

    if (!busTicket) {
      return res.status(404).json({
        ok: false,
        message: 'BusTicket not found',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteBusTicket = async (req, res = response) => {
  try {
    const busTicketId = req.params.id;
    const busTicket = await BusTicket.findById(busTicketId);

    if (!busTicket) {
      return res.status(404).json({
        ok: false,
        message: 'BusTicket not found',
      });
    }

    const deletedBusTicket = await BusTicket.findByIdAndDelete(busTicketId);

    return res.json({
      ok: true,
      busTicket: deletedBusTicket,
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
  listBusTickets,
  getBusTicket,
  newBusTicket,
  modifyBusTicket,
  deleteBusTicket,
};
