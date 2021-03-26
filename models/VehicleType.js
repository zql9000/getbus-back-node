const { Schema, model } = require('mongoose');

const VehicleTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

VehicleTypeSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('VehicleType', VehicleTypeSchema);
