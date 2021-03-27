const { Schema, model } = require('mongoose');

const BusTicketSchema = new Schema({
  personId: {
    type: Schema.Types.ObjectId,
    ref: 'Passenger',
    required: true,
  },
  invoiceId: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  busTicketNumber: {
    type: String,
    required: true,
  },
});

BusTicketSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('BusTicket', BusTicketSchema);
