const { Schema, model } = require('mongoose');

const TravelSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  sectionIdOrigin: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  busStationIdDestination: {
    type: Schema.Types.ObjectId,
    ref: 'BusStation',
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  numberedSeats: {
    type: Boolean,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  originPlatform: {
    type: String,
    required: true,
  },
});

TravelSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Travel', TravelSchema);
