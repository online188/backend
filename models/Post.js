const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  numberOfItems: {
    type: Number,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  linkMediaFire: {
    type: String,
    required: true,
  },
  linkTerraBox: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  thumbnail: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  postViews: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
