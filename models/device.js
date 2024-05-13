// models/device.js

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  matricule: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  deviceId: {
     type: String, 
     required: true 
    },
  category: {
     type: String,
      enum: ['legumes_fruits', 'viande', 'poisson'],
       required: true }

});


const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
