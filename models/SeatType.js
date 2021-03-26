const { Schema, model } = require('mongoose');

const SeatTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

SeatTypeSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('SeatType', SeatTypeSchema);
