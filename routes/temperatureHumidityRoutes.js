// routes/temperatureHumidityRoutes.js
const express = require('express');
const router = express.Router();
const TemperatureHumidity = require('../models/temperatureHumidity');

// Route pour créer une nouvelle entrée de température et d'humidité
router.post('/', async (req, res) => {
  try {
    const { deviceId, temperature, humidity } = req.body;

    const temperatureHumidity = new TemperatureHumidity({
      deviceId,
      temperature,
      humidity
    });

    await temperatureHumidity.save();
    res.status(201).json({ message: 'Temperature and humidity entry created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour récupérer toutes les entrées de température et d'humidité pour un appareil donné
router.get('/device/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const entries = await TemperatureHumidity.find({ deviceId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour mettre à jour une entrée de température et d'humidité
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { temperature, humidity } = req.body;

    const updatedEntry = await TemperatureHumidity.findByIdAndUpdate(id, { temperature, humidity }, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Temperature and humidity entry not found' });
    }

    res.json({ message: 'Temperature and humidity entry updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour supprimer une entrée de température et d'humidité
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEntry = await TemperatureHumidity.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Temperature and humidity entry not found' });
    }

    res.json({ message: 'Temperature and humidity entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
