const mongoose = require('mongoose');
const { initialData } = require('./initialData');
const User = require('../models/User');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    // if there are no users in the database, create initial data
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      initialData();
    }

    console.log('Connected to database');
  } catch (error) {
    console.log(error);
    throw new Error('Fail to connect to database');
  }
};

module.exports = { dbConnection };
