const { response } = require('express');
const mongoose = require('mongoose');
const { responseMessages } = require('../helpers/spanishMessages');
const DocumentType = require('../models/DocumentType');

const listDocumentTypes = async (req, res = response) => {
  try {
    const documentTypes = await DocumentType.find();

    return res.json({
      ok: true,
      documentTypes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getDocumentType = async (req, res = response) => {
  try {
    const documentTypeId = req.params.id;
    const documentType = await DocumentType.findById(documentTypeId);

    return res.json({
      ok: true,
      documentType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newDocumentType = async (req, res = response) => {
  try {
    const existingDocumentType = await DocumentType.findOne({
      $or: [{ name: req.body.name }, { shortName: req.body.shortName }],
    });

    if (existingDocumentType) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgDocumentTypeExists,
      });
    }

    const documentType = new DocumentType(req.body);
    const insertedDocumentType = await documentType.save();

    return res.status(201).json({
      ok: true,
      documentType: insertedDocumentType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyDocumentType = async (req, res = response) => {
  try {
    const documentTypeId = req.params.id;
    const existingDocumentType = await DocumentType.findOne({
      $or: [{ name: req.body.name }, { shortName: req.body.shortName }],
      _id: { $ne: documentTypeId },
    });

    if (existingDocumentType) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgDocumentTypeExists,
      });
    }

    const documentType = await DocumentType.findById(documentTypeId);

    if (!documentType) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgDocumentTypeNotFoud,
      });
    }

    const newDocumentType = { ...req.body };

    const updatedDocumentType = await DocumentType.findByIdAndUpdate(
      documentTypeId,
      newDocumentType,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      documentType: updatedDocumentType,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteDocumentType = async (req, res = response) => {
  try {
    const documentTypeId = req.params.id;
    const deletedDocumentType = await DocumentType.findByIdAndDelete(
      documentTypeId
    );

    if (!deletedDocumentType) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgDocumentTypeNotFoud,
      });
    }

    return res.json({
      ok: true,
      documentType: deletedDocumentType,
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
  listDocumentTypes,
  getDocumentType,
  newDocumentType,
  modifyDocumentType,
  deleteDocumentType,
};
