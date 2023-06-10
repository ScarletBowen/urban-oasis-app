const mongoose = require('mongoose');
const Place = require('../models/Place');
const User = require('../models/User');

const places = require('./irvineparks.json');
const userData = require('./sampleUsers.json');

async function seedPlaces() {
  // Connect to the MongoDB database
  

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/urban-oasis');
    console.log(places);
    console.log(Place);
    // Drop existing Places and Users to clean start every time you seed
    await Place.deleteMany({});
    await User.deleteMany({});
   
    // Create user documents using the userData array
    await User.create(userData);

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

async function seedUsers() {
  // Connect to the MongoDB database
  

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/urban-oasis');
    console.log(userData);
    console.log(User);
    // Drop existing Users to clean start every time you seed
    await User.deleteMany();
   
    // Create user documents using the userData array
    await User.create(userData);


    console.log('user Data seeded!');
  } catch (error) {
    console.error('Error while seeding database', error);
  } finally {
    // Close the connection to the database
    await mongoose.connection.close();
  }
}

seedPlaces();
seedUsers();

