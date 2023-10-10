const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // You can add more fields as needed, such as permissions or description
});

const Role = mongoose.model('Roles', roleSchema);

module.exports = Role;
