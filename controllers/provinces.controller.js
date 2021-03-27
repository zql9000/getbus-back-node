const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newProvince = async (req, res = response) => {
  try {
    const existingProvince = await Province.find({ name: req.body.name });

    if (existingProvince) {
      return res.status(409).json({
        ok: false,
        message: 'A province with this name already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyProvince = async (req, res = response) => {
  try {
    const provinceId = req.params.id;
    const existingProvince = await Province.find({
      name: req.body.name,
      _id: { $not: { provinceId } },
    });

    if (existingProvince) {
      return res.status(409).json({
        ok: false,
        message: 'A province with this name already exists',
      });
    }

    const province = await Province.findById(provinceId);

    if (!province) {
      return res.status(404).json({
        ok: false,
        message: 'Province not found',
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
      message: 'Ask the administrator for information about this error',
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
        message: 'Province not found',
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
      message: 'Ask the administrator for information about this error',
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
