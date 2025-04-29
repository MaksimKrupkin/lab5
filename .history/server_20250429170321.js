const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose
  .connect('mongodb://localhost:27017/watchStore')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));

// Схема и модель для часов
const watchSchema = new mongoose.Schema({
  brand: String,
  type: String,
  manufacturer: String,
  price: Number,
});

const Watch = mongoose.model('Watch', watchSchema);

// Роуты
app.get('/watches/cheaper-than', async (req, res) => {
  const maxPrice = req.query.maxPrice;
  const watches = await Watch.find({ price: { $lt: maxPrice } });
  res.json(watches.map((w) => w.brand));
});

app.put('/watches/manufacturer', async (req, res) => {
  const newManufacturer = req.body.manufacturer;
  await Watch.updateMany({}, { manufacturer: newManufacturer });
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on port 3000'));
