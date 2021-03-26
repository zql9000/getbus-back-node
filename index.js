const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.route'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server runnig on port: ${port}`);
});
