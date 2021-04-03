const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Invoice = require('../models/Invoice');

const listInvoices = async (req, res = response) => {
  try {
    const invoices = await Invoice.find();

    return res.json({
      ok: true,
      invoices,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getInvoice = async (req, res = response) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    return res.json({
      ok: true,
      invoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newInvoice = async (req, res = response) => {
  try {
    const existingInvoice = await Invoice.findOne({ number: req.body.number });

    if (existingInvoice) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgInvoiceExists,
      });
    }

    const invoice = new Invoice(req.body);
    invoice.userId = req.userId;
    invoice.totalAmount = invoice.UnitPrice * invoice.quantity;
    const insertedInvoice = await invoice.save();

    return res.status(201).json({
      ok: true,
      invoice: insertedInvoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyInvoice = async (req, res = response) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgInvoiceNotFound,
      });
    }

    const existingInvoice = await Invoice.findOne({
      number: req.body.number,
      _id: { $ne: invoiceId },
    });

    if (existingInvoice) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgInvoiceExists,
      });
    }

    const newInvoice = { ...req.body };
    newInvoice.userId = req.userId;
    newInvoice.totalAmount = invoice.UnitPrice * invoice.quantity;
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      newInvoice,
      {
        new: true,
      }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgInvoiceNotFound,
      });
    }

    return res.json({
      ok: true,
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteInvoice = async (req, res = response) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgInvoiceNotFound,
      });
    }

    return res.json({
      ok: true,
      invoice: deletedInvoice,
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
  listInvoices,
  getInvoice,
  newInvoice,
  modifyInvoice,
  deleteInvoice,
};
