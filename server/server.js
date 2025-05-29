const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const VehiclePartRoutes = require('./routes/VehiclePartRoutes');


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// app.use('/api/jobs', JobRoutes);
app.use('/api/vehicleparts', VehiclePartRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});