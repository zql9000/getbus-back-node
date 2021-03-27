const { Schema, model } = require('mongoose');

const TravelDetailSchema = new Schema({
  travelId: {
    type: Schema.Types.ObjectId,
    ref: 'Travel',
    required: true,
  },
  busTicketId: {
    type: Schema.Types.ObjectId,
    ref: 'BusTicket',
    required: true,
  },
});

TravelDetailSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('TravelDetail', TravelDetailSchema);
