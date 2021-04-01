const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const TransportCompany = require('../models/TransportCompany');

const listTransportCompanies = async (req, res = response) => {
  try {
    const transportCompanies = await TransportCompany.find();

    return res.json({
      ok: true,
      transportCompanies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getTransportCompany = async (req, res = response) => {
  try {
    const transportCompanyId = req.params.id;
    const transportCompany = await TransportCompany.findById(
      transportCompanyId
    );

    return res.json({
      ok: true,
      transportCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newTransportCompany = async (req, res = response) => {
  try {
    const existingTransportCompany = await TransportCompany.find({
      name: req.body.name,
    });

    if (existingTransportCompany) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgTransportCompanyExists,
      });
    }

    const transportCompany = new TransportCompany(req.body);
    const insertedTransportCompany = await transportCompany.save();

    return res.status(201).json({
      ok: true,
      transportCompany: insertedTransportCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyTransportCompany = async (req, res = response) => {
  try {
    const transportCompanyId = req.params.id;
    const existingTransportCompany = await TransportCompany.find({
      name: req.body.name,
      _id: { $ne: { transportCompanyId } },
    });

    if (existingTransportCompany) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgTransportCompanyExists,
      });
    }

    const transportCompany = await TransportCompany.findById(
      transportCompanyId
    );

    if (!transportCompany) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgTransportCompanyNotFound,
      });
    }

    const newTransportCompany = { ...req.body };

    const updatedTransportCompany = await TransportCompany.findByIdAndUpdate(
      transportCompanyId,
      newTransportCompany,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      transportCompany: updatedTransportCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteTransportCompany = async (req, res = response) => {
  try {
    const transportCompanyId = req.params.id;
    const transportCompany = await TransportCompany.findById(
      transportCompanyId
    );

    if (!transportCompany) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgTransportCompanyNotFound,
      });
    }

    const deletedTransportCompany = await TransportCompany.findByIdAndDelete(
      transportCompanyId
    );

    return res.json({
      ok: true,
      transportCompany: deletedTransportCompany,
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
  listTransportCompanies,
  getTransportCompany,
  newTransportCompany,
  modifyTransportCompany,
  deleteTransportCompany,
};
