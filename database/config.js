const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to database');
  } catch (error) {
    console.log(error);
    throw new Error('Fail to connect to database');
  }
};

module.exports = { dbConnection };
