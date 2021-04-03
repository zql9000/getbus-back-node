const { response } = require('express');
const BusStation = require('../models/BusStation');
const { responseMessages } = require('../helpers/spanishMessages');
const City = require('../models/City');

const listBusStations = async (req, res = response) => {
  try {
    const busStations = await BusStation.find().populate('cityId');

    return res.json({
      ok: true,
      busStations: busStations.map((busStation) => ({
        id: busStation.id,
        name: busStation.name,
        cityId: busStation.cityId._id,
        cityName: busStation.cityId.name,
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

const getBusStation = async (req, res = response) => {
  try {
    const busStationId = req.params.id;
    const busStation = await BusStation.findById(busStationId).populate(
      'cityId'
    );

    return res.json({
      ok: true,
      busStation: {
        id: busStation.id,
        name: busStation.name,
        cityId: busStation.cityId._id,
        cityName: busStation.cityId.name,
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

const newBusStation = async (req, res = response) => {
  try {
    const existingBusStation = await BusStation.findOne({
      name: req.body.name,
      cityId: req.body.cityId,
    });

    if (existingBusStation) {
      return res.status(409).json({
        ok: false,
        message: 'A busStation with this name and cityId already exists',
      });
    }

    const existingCity = await City.findById(req.body.cityId);

    if (!existingCity) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgCityNotFound,
      });
    }

    const busStation = new BusStation(req.body);
    const insertedBusStation = await busStation.save();

    return res.status(201).json({
      ok: true,
      busStation: {
        id: insertedBusStation.id,
        name: insertedBusStation.name,
        cityId: existingCity._id,
        cityName: existingCity.name,
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

const modifyBusStation = async (req, res = response) => {
  try {
    const busStationId = req.params.id;
    const busStation = await BusStation.findById(busStationId);

    if (!busStation) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgBusStationNotFound,
      });
    }

    const existingBusStation = await BusStation.findOne({
      name: req.body.name,
      cityId: req.body.cityId,
      _id: { $ne: busStationId },
    });

    if (existingBusStation) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgBusStationExists,
      });
    }

    const existingCity = await City.findById(req.body.cityId);

    if (!existingCity) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgCityNotFound,
      });
    }

    const newBusStation = { ...req.body };
    const updatedBusStation = await BusStation.findByIdAndUpdate(
      busStationId,
      newBusStation,
      {
        new: true,
      }
    );

    if (!updatedBusStation) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgBusStationNotFound,
      });
    }

    return res.json({
      ok: true,
      busStation: {
        id: updatedBusStation.id,
        name: updatedBusStation.name,
        cityId: existingCity._id,
        cityName: existingCity.name,
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

const deleteBusStation = async (req, res = response) => {
  try {
    const busStationId = req.params.id;
    const deletedBusStation = await BusStation.findByIdAndDelete(busStationId);

    if (!deletedBusStation) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgBusStationNotFound,
      });
    }

    return res.json({
      ok: true,
      busStation: deletedBusStation,
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
  listBusStations,
  getBusStation,
  newBusStation,
  modifyBusStation,
  deleteBusStation,
};
