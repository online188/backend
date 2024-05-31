const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title must have a name'],
    unique: true,
    trim: true,
    maxlength: [90, 'A title name must have less or equal then 90 characters'],
    minlength: [3, 'A title name must have more or equal then 3 characters']
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
  slug: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre('save', function(next) {
  if (this.isModified('model')) {
    this.slug = slugify(this.model, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
