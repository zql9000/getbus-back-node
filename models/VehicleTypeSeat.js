const { Schema, model } = require('mongoose');

const VehicleTypeSeatSchema = new Schema({
  vehicleType: {
    type: Schema.Types.ObjectId,
    ref: 'VehicleType',
    required: true,
  },
  seat: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  locationX: {
    type: Number,
    required: true,
  },
  locationY: {
    type: Number,
    required: true,
  },
});

VehicleTypeSeatSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('VehicleTypeSeat', VehicleTypeSeatSchema);
