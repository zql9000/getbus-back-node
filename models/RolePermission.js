const { Schema, model } = require('mongoose');

const RolePermissionSchema = new Schema({
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  permission: {
    type: Schema.Types.ObjectId,
    ref: 'Permission',
    required: true,
  },
});

RolePermissionSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = model('RolePermission', RolePermissionSchema);
