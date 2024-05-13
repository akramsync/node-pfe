// routes/devices.js

const express = require('express');
const router = express.Router();
const Device = require('../models/device');

// Create a new device
router.post('/', async (req, res) => {
  try {
    const newDevice = new Device({
      nom: req.body.name,
      telephone: req.body.telephone,
      email: req.body.email,
      matricule: req.body.matricule,
      address: req.body.address,

  });
 

  const savedDevice = await newDevice.save();

  res.status(201).json({ message: 'Device created successfully', Device: savedDevice });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json({ devices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a device by ID
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) throw new Error('Device not found');
    res.json({ device });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Update a device by ID
router.put('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!device) throw new Error('Device not found');
    res.json({ device });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Delete a device by ID
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) throw new Error('Device not found');
    res.json({ message: 'Device deleted' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
  

// Mettre à jour la catégorie de l'appareil
router.put('/:id/category', async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const device = await Device.findByIdAndUpdate(id, { category }, { new: true });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json({ message: 'Device category updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
  