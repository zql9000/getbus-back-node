const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
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
        message: 'A transportCompany with this name already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyTransportCompany = async (req, res = response) => {
  try {
    const transportCompanyId = req.params.id;
    const existingTransportCompany = await TransportCompany.find({
      name: req.body.name,
      _id: { $not: { transportCompanyId } },
    });

    if (existingTransportCompany) {
      return res.status(409).json({
        ok: false,
        message: 'A transportCompany with this name already exists',
      });
    }

    const transportCompany = await TransportCompany.findById(
      transportCompanyId
    );

    if (!transportCompany) {
      return res.status(404).json({
        ok: false,
        message: 'TransportCompany not found',
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
      message: 'Ask the administrator for information about this error',
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
        message: 'TransportCompany not found',
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
      message: 'Ask the administrator for information about this error',
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
