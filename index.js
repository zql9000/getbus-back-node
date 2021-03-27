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
app.use('/api/role-permissions', require('./routes/role-permissions.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/document-types', require('./routes/document-types.route'));
app.use('/api/provinces', require('./routes/provinces.route'));
app.use('/api/cities', require('./routes/cities.route'));
app.use('/api/bus-stations', require('./routes/bus-stations.route'));
app.use('/api/sections', require('./routes/sections.route'));
app.use('/api/seat-types', require('./routes/seat-types.route'));
app.use('/api/seats', require('./routes/seats.route'));
app.use('/api/vehicle-types', require('./routes/vehicle-types.route'));
app.use(
  '/api/transport-companies',
  require('./routes/transport-companies.route')
);
app.use(
  '/api/vehicle-type-seats',
  require('./routes/vehicle-type-seats.route')
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server runnig on port: ${port}`);
});
