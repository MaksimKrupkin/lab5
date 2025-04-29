const mongoose = require('mongoose');
const Watch = require('../models/Watch');

const sampleWatches = [
  { brand: 'Omega', type: 'Analog', manufacturer: 'Omega SA', price: 1500 },
  { brand: 'Casio', type: 'Digital', manufacturer: 'Casio Inc.', price: 80 },
  { brand: 'Rolex', type: 'Luxury', manufacturer: 'Rolex SA', price: 8000 },
  { brand: 'Seiko', type: 'Automatic', manufacturer: 'Seiko Holdings', price: 350 },
  { brand: 'Timex', type: 'Quartz', manufacturer: 'Timex Group', price: 120 },
  { brand: 'Citizen', type: 'Eco-Drive', manufacturer: 'Citizen Watch Co.', price: 250 },
];

async function seedData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/watchStore');
    await Watch.deleteMany({});
    await Watch.insertMany(sampleWatches);
    console.log('✅ База данных успешно заполнена!');
  } catch (err) {
    console.error('❌ Ошибка при заполнении:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
