const { Schema, model } = require('mongoose');

const BusStationSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

BusStationSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('BusStation', BusStationSchema);
