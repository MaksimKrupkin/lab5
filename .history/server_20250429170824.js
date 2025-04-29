const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Раздача статических файлов
app.set('json spaces', 2); // Форматирование JSON

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
  try {
    const maxPrice = Number(req.query.maxPrice);

    if (isNaN(maxPrice)) {
      return res.status(400).json({ error: 'Invalid maxPrice parameter' });
    }

    const watches = await Watch.find({ price: { $lt: maxPrice } });
    res.json(watches.map((w) => w.brand));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/watches/manufacturer', async (req, res) => {
  try {
    const newManufacturer = req.body.manufacturer;
    await Watch.updateMany({}, { manufacturer: newManufacturer });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
