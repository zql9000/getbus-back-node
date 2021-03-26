const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

RoleSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Role', RoleSchema);
