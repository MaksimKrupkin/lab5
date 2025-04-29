const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/watchStore')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));

const watchSchema = new mongoose.Schema({
  brand: String,
  type: String,
  manufacturer: String,
  price: Number,
});

const Watch = mongoose.model('Watch', watchSchema);

const sampleWatches = [
  { brand: 'Omega', type: 'Analog', manufacturer: 'Omega SA', price: 1500 },
  { brand: 'Casio', type: 'Digital', manufacturer: 'Casio Inc.', price: 80 },
  { brand: 'Rolex', type: 'Luxury', manufacturer: 'Rolex SA', price: 8000 },
  { brand: 'Seiko', type: 'Automatic', manufacturer: 'Seiko Holdings', price: 350 },
  { brand: 'Timex', type: 'Quartz', manufacturer: 'Timex Group', price: 120 },
  { brand: 'Citizen', type: 'Eco-Drive', manufacturer: 'Citizen Watch Co.', price: 250 },
];

async function seedData() {
  await Watch.deleteMany({});
  await Watch.insertMany(sampleWatches);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seedData();
