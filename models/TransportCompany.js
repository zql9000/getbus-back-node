const { Schema, model } = require('mongoose');

const TransportCompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

TransportCompanySchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('TransportCompany', TransportCompanySchema);
