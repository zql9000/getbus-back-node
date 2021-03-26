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
app.use('/api/roles', require('./routes/roles.route'));
app.use('/api/permissions', require('./routes/permissions.route'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server runnig on port: ${port}`);
});
