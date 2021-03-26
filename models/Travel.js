const { Schema, model } = require('mongoose');

const TravelSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  sectionOrigin: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  busStationDestination: {
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
