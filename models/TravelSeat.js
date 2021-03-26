const { Schema, model } = require('mongoose');

const TravelSeatSchema = new Schema({
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
  number: {
    type: String,
    required: true,
  },
  travelDetail: {
    type: Schema.Types.ObjectId,
    ref: 'TravelDetail',
    required: true,
  },
});

TravelSeatSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('TravelSeat', TravelSeatSchema);
