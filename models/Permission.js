const { Schema, model } = require('mongoose');

const PermissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

PermissionSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('Permission', PermissionSchema);
