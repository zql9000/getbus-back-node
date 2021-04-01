const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Province = require('../models/Province');

const listProvinces = async (req, res = response) => {
  try {
    const provinces = await Province.find();

    return res.json({
      ok: true,
      provinces,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getProvince = async (req, res = response) => {
  try {
    const provinceId = req.params.id;
    const province = await Province.findById(provinceId);

    return res.json({
      ok: true,
      province,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newProvince = async (req, res = response) => {
  try {
    const existingProvince = await Province.findOne({ name: req.body.name });

    if (existingProvince) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgProvinceExists,
      });
    }

    const province = new Province(req.body);
    const insertedProvince = await province.save();

    return res.status(201).json({
      ok: true,
      province: insertedProvince,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyProvince = async (req, res = response) => {
  try {
    const provinceId = req.params.id;
    const existingProvince = await Province.findOne({
      name: req.body.name,
    });

    if (existingProvince) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgProvinceExists,
      });
    }

    const province = await Province.findById(provinceId);

    if (!province) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgProvinceNotFound,
      });
    }

    const newProvince = { ...req.body };

    const updatedProvince = await Province.findByIdAndUpdate(
      provinceId,
      newProvince,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      province: updatedProvince,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteProvince = async (req, res = response) => {
  try {
    const provinceId = req.params.id;
    const province = await Province.findById(provinceId);

    if (!province) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgProvinceNotFound,
      });
    }

    const deletedProvince = await Province.findByIdAndDelete(provinceId);

    return res.json({
      ok: true,
      province: deletedProvince,
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
  listProvinces,
  getProvince,
  newProvince,
  modifyProvince,
  deleteProvince,
};
