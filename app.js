// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/signupform', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Define a schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Handle POST requests to /signup
app.post('/signup', (req, res) => {
  // Create a new user using the User model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Save the user to the database
  user.save()
    .then(() => {
      res.send('User registered successfully');
    })
    .catch((err) => {
      res.status(500).send('Failed to register user');
    });
});

// Start the server
app.listen(3023, () => {
  console.log('Server started on port 3023');
});
