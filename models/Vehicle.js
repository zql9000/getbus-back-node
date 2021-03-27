const { Schema, model } = require('mongoose');

const VehicleSchema = new Schema({
  internNumber: {
    type: String,
    required: true,
  },
  transportCompanyId: {
    type: Schema.Types.ObjectId,
    ref: 'TransportCompany',
    required: true,
  },
  vehicleTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'VehicleType',
    required: true,
  },
});

VehicleSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Vehicle', VehicleSchema);
