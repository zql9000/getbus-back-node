const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

InvoiceSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Invoice', InvoiceSchema);
