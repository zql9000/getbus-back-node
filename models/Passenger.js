const { Schema, model } = require('mongoose');

const PassengerSchema = new Schema({
  personId: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
});

PassengerSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Passenger', PassengerSchema);
