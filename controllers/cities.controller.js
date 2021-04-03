const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const City = require('../models/City');
const Province = require('../models/Province');

const listCities = async (req, res = response) => {
  try {
    const cities = await City.find().populate('provinceId');

    return res.json({
      ok: true,
      cities: cities.map((city) => ({
        id: city.id,
        name: city.name,
        provinceId: city.provinceId._id,
        provinceName: city.provinceId.name,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getCity = async (req, res = response) => {
  try {
    const cityId = req.params.id;
    const city = await City.findById(cityId).populate('provinceId');

    return res.json({
      ok: true,
      city: {
        id: city.id,
        name: city.name,
        provinceId: city.provinceId._id,
        provinceName: city.provinceId.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newCity = async (req, res = response) => {
  try {
    const existingCity = await City.findOne({
      name: req.body.name,
      provinceId: req.body.provinceId,
    });

    if (existingCity) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgCityExists,
      });
    }

    const existingProvince = await Province.findById(req.body.provinceId);

    if (!existingProvince) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgProvinceNotFound,
      });
    }

    const city = new City(req.body);
    const insertedCity = await city.save();

    return res.status(201).json({
      ok: true,
      city: {
        id: insertedCity.id,
        name: insertedCity.name,
        provinceId: insertedCity.provinceId,
        provinceName: existingProvince.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyCity = async (req, res = response) => {
  try {
    const cityId = req.params.id;
    const existingCity = await City.findOne({
      name: req.body.name,
      provinceId: req.body.provinceId,
      _id: { $ne: cityId },
    });

    if (existingCity) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgCityExists,
      });
    }

    const existingProvince = await Province.findById(req.body.provinceId);

    if (!existingProvince) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgProvinceNotFound,
      });
    }

    const city = await City.findById(cityId);

    if (!city) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgCityNotFoud,
      });
    }

    const newCity = { ...req.body };

    const updatedCity = await City.findByIdAndUpdate(cityId, newCity, {
      new: true,
    });

    return res.json({
      ok: true,
      city: {
        id: updatedCity.id,
        name: updatedCity.name,
        provinceId: updatedCity.provinceId,
        provinceName: existingProvince.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteCity = async (req, res = response) => {
  try {
    const cityId = req.params.id;
    const deletedCity = await City.findByIdAndDelete(cityId);

    if (!deletedCity) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgCityNotFoud,
      });
    }

    return res.json({
      ok: true,
      city: deletedCity,
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
  listCities,
  getCity,
  newCity,
  modifyCity,
  deleteCity,
};
