const { Schema, model } = require('mongoose');

const ProvinceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

ProvinceSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Province', ProvinceSchema);
