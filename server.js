const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const postRoutes = require('./routes/posts');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined')); // Add morgan middleware for logging

// Routes Middleware
app.use('/api/posts', postRoutes);


// MongoDB connection
mongoose.connect('mongodb+srv://admin:asdasd@cluster0.mc2c7ld.mongodb.net/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
