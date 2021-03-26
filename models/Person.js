const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
  documentType: {
    type: Schema.Types.ObjectId,
    ref: 'DocumentType',
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
});

PersonSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Person', PersonSchema);
