const { Schema, model } = require('mongoose');

const SeatSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  seatTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'SeatType',
    required: true,
  },
});

SeatSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Seat', SeatSchema);
