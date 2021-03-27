const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newSection = async (req, res = response) => {
  try {
    const existingSection = await Section.find({
      busStationId: req.body.busStationId,
      busStationIdNext: req.body.busStationIdNext,
    });

    if (existingSection) {
      return res.status(409).json({
        ok: false,
        message:
          'A section with this busStationId and busStationIdNext already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifySection = async (req, res = response) => {
  try {
    const sectionId = req.params.id;
    const existingSection = await Section.find({
      busStationId: req.body.busStationId,
      busStationIdNext: req.body.busStationIdNext,
      _id: { $not: { sectionId } },
    });

    if (existingSection) {
      return res.status(409).json({
        ok: false,
        message:
          'A section with this busStationId and busStationIdNext already exists',
      });
    }

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        ok: false,
        message: 'Section not found',
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

    return res.json({
      ok: true,
      section: updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteSection = async (req, res = response) => {
  try {
    const sectionId = req.params.id;
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        ok: false,
        message: 'Section not found',
      });
    }

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    return res.json({
      ok: true,
      section: deletedSection,
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
  listSections,
  getSection,
  newSection,
  modifySection,
  deleteSection,
};
