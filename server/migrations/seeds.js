const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
require("dotenv").config();


const Place = require("../models/Place");
const User = require("../models/User");

const places = require("./irvineparks.json");


async function createRandomUser() {
  return {
    username: faker.internet.userName(),
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    password: await bcrypt.hash("123", 10),
    bio: faker.person.bio(),
    gender: faker.person.sex(),
    friend_id: Math.random().toString(36),
    friends: [],
    savedPlaces: [],
  };
}



async function seedDB() {
  // Connect to the MongoDB database
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urban-oasis"
    );

    // Drop existing Places to clean start every time you seed
    await Place.deleteMany({});
    // Insert the seed data into the database using your Place model
    await Place.insertMany(places.results);

    const promises = faker.helpers.multiple(createRandomUser, {
      count: 20,
    });
    await Promise.all(promises).then(async (users) => {
      await User.deleteMany({});
      await User.insertMany(users);
    });

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error while seeding database", error);
  } finally {
    // Close the connection to the database
    await mongoose.connection.close();
  }
}

seedDB();
