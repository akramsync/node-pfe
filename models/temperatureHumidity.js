// models/temperatureHumidity.js
const mongoose = require('mongoose');

const temperatureHumiditySchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TemperatureHumidity', temperatureHumiditySchema);
