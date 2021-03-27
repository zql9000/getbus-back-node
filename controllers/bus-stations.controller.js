const { response } = require('express');
const BusStation = require('../models/BusStation');

const listBusStations = async (req, res = response) => {
  try {
    const busStations = await BusStation.find().populate('cityId');

    return res.json({
      ok: true,
      busStations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
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
      busStation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newBusStation = async (req, res = response) => {
  try {
    const existingBusStation = await BusStation.find({
      name: req.body.name,
      cityId: req.body.cityId,
    });

    if (existingBusStation) {
      return res.status(409).json({
        ok: false,
        message: 'A busStation with this name and cityId already exists',
      });
    }

    const busStation = new BusStation(req.body);
    const insertedBusStation = await busStation.save();

    return res.status(201).json({
      ok: true,
      busStation: insertedBusStation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyBusStation = async (req, res = response) => {
  try {
    const busStationId = req.params.id;
    const existingBusStation = await BusStation.find({
      name: req.body.name,
      cityId: req.body.cityId,
      _id: { $not: { busStationId } },
    });

    if (existingBusStation) {
      return res.status(409).json({
        ok: false,
        message: 'A busStation with this name and cityId already exists',
      });
    }

    const busStation = await BusStation.findById(busStationId);

    if (!busStation) {
      return res.status(404).json({
        ok: false,
        message: 'BusStation not found',
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

    return res.json({
      ok: true,
      busStation: updatedBusStation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteBusStation = async (req, res = response) => {
  try {
    const busStationId = req.params.id;
    const busStation = await BusStation.findById(busStationId);

    if (!busStation) {
      return res.status(404).json({
        ok: false,
        message: 'BusStation not found',
      });
    }

    const deletedBusStation = await BusStation.findByIdAndDelete(busStationId);

    return res.json({
      ok: true,
      busStation: deletedBusStation,
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
  listBusStations,
  getBusStation,
  newBusStation,
  modifyBusStation,
  deleteBusStation,
};
