const { Schema, model } = require('mongoose');

const SectionSchema = new Schema({
  busStationId: {
    type: Schema.Types.ObjectId,
    ref: 'BusStation',
    required: true,
  },
  busStationIdNext: {
    type: Schema.Types.ObjectId,
    ref: 'BusStation',
    required: true,
  },
});

SectionSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Section', SectionSchema);
