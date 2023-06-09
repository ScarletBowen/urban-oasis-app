const mongoose = require('mongoose');
const Place = require('../models/Place');

const places = require('./irvineparks.json');

async function seedDB() {
  // Connect to the MongoDB database
  

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/urban-oasis');
    console.log(places);
    console.log(Place);
    // Drop existing Places to clean start every time you seed
    await Place.deleteMany({});
   

    // Insert the seed data into the database using your Place model
    await Place.insertMany(places.results);
    console.log('Database seeded!');
  } catch (error) {
    console.error('Error while seeding database', error);
  } finally {
    // Close the connection to the database
    await mongoose.connection.close();
  }
}

seedDB();

