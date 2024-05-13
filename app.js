// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const deviceRoutes = require('./routes/devices');
const temperatureHumidityRoutes = require('./routes/temperatureHumidityRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/temperature-humidity', temperatureHumidityRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
