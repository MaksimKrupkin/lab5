const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Watch = require('./models/Watch');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect('mongodb://localhost:27017/watchStore')
  .then(() => console.log('✅ MongoDB подключена'))
  .catch((err) => console.error('❌ Ошибка подключения:', err));

// Routes
app.get('/watches/cheaper-than', async (req, res) => {
  const maxPrice = Number(req.query.maxPrice);
  if (isNaN(maxPrice)) return res.status(400).json({ error: 'Invalid maxPrice' });

  const watches = await Watch.find({ price: { $lt: maxPrice } });
  res.json(watches.map((w) => w.brand));
});

app.put('/watches/manufacturer', async (req, res) => {
  const { manufacturer } = req.body;
  if (!manufacturer) return res.status(400).json({ error: 'Manufacturer is required' });

  await Watch.updateMany({}, { manufacturer });
  res.sendStatus(200);
});

app.listen(3000, () => console.log('🚀 Сервер запущен на http://localhost:3000'));
