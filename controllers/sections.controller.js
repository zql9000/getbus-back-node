const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Section = require('../models/Section');

const listSections = async (req, res = response) => {
  try {
    const sections = await Section.find()
      .populate('busStationId')
      .populate('busStationIdNext');

    return res.json({
      ok: true,
      sections,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getSection = async (req, res = response) => {
  try {
    const sectionId = req.params.id;
    const section = await Section.findById(sectionId)
      .populate('busStationId')
      .populate('busStationIdNext');

    return res.json({
      ok: true,
      section,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newSection = async (req, res = response) => {
  try {
    const existingSection = await Section.findOne({
      busStationId: req.body.busStationId,
      busStationIdNext: req.body.busStationIdNext,
    });

    if (existingSection) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgSectionExists,
      });
    }

    const section = new Section(req.body);
    const insertedSection = await section.save();

    return res.status(201).json({
      ok: true,
      section: insertedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifySection = async (req, res = response) => {
  try {
    const sectionId = req.params.id;
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSectionNotFound,
      });
    }

    const existingSection = await Section.findOne({
      busStationId: req.body.busStationId,
      busStationIdNext: req.body.busStationIdNext,
      _id: { $ne: sectionId },
    });

    if (existingSection) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgSectionExists,
      });
    }

    const newSection = { ...req.body };
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      newSection,
      {
        new: true,
      }
    );

    if (!updatedSection) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSectionNotFound,
      });
    }

    return res.json({
      ok: true,
      section: updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteSection = async (req, res = response) => {
  try {
    const sectionId = req.params.id;
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgSectionNotFound,
      });
    }

    return res.json({
      ok: true,
      section: deletedSection,
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
  listSections,
  getSection,
  newSection,
  modifySection,
  deleteSection,
};
