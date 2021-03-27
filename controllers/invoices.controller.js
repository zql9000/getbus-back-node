const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newInvoice = async (req, res = response) => {
  try {
    const existingInvoice = await Invoice.find({ number: req.body.number });

    if (existingInvoice) {
      return res.status(409).json({
        ok: false,
        message: 'A invoice with this number already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyInvoice = async (req, res = response) => {
  try {
    const invoiceId = req.params.id;
    const existingInvoice = await Invoice.find({
      number: req.body.number,
      _id: { $not: { invoiceId } },
    });

    if (existingInvoice) {
      return res.status(409).json({
        ok: false,
        message: 'A invoice with this number already exists',
      });
    }

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        ok: false,
        message: 'Invoice not found',
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

    return res.json({
      ok: true,
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteInvoice = async (req, res = response) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({
        ok: false,
        message: 'Invoice not found',
      });
    }

    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    return res.json({
      ok: true,
      invoice: deletedInvoice,
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
  listInvoices,
  getInvoice,
  newInvoice,
  modifyInvoice,
  deleteInvoice,
};
