const { Schema, model } = require('mongoose');

const DocumentTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
});

DocumentTypeSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('DocumentType', DocumentTypeSchema);
