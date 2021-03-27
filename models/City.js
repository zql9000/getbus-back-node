const { Schema, model } = require('mongoose');

const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  provinceId: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  },
});

CitySchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('City', CitySchema);
