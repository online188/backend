const Post = require('../models/Post');

// Get all posts with pagination and filter by tag
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tag = req.query.tag || '';
    const skip = (page - 1) * limit;

    const filter = tag ? { tag } : {};

    const totalPosts = await Post.countDocuments(filter);
    const posts = await Post.find(filter).skip(skip).limit(limit);
    res.json({ totalPosts, posts, currentPage: page, totalPages: Math.ceil(totalPosts / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New function to get random posts
exports.getRandomPosts = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    const random = Math.floor(Math.random() * count);
    const posts = await Post.find().skip(random).limit(6);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by ID with pagination for images and increment post views
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.postViews += 1;
    await post.save();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalImages = post.images.length;
    const images = post.images.slice(skip, skip + limit);

    res.json({ post, images, currentPage: page, totalPages: Math.ceil(totalImages / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    model: req.body.model,
    numberOfItems: req.body.numberOfItems,
    fileSize: req.body.fileSize,
    dimensions: req.body.dimensions,
    linkMediaFire: req.body.linkMediaFire,
    linkTerraBox: req.body.linkTerraBox,
    images: req.body.images,
    thumbnail: req.body.thumbnail,
    tag: req.body.tag,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = req.body.title || post.title;
    post.model = req.body.model || post.model;
    post.numberOfItems = req.body.numberOfItems || post.numberOfItems;
    post.fileSize = req.body.fileSize || post.fileSize;
    post.dimensions = req.body.dimensions || post.dimensions;
    post.linkMediaFire = req.body.linkMediaFire || post.linkMediaFire;
    post.linkTerraBox = req.body.linkTerraBox || post.linkTerraBox;
    post.images = req.body.images || post.images;
    post.thumbnail = req.body.thumbnail || post.thumbnail;
    post.tag = req.body.tag || post.tag;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get top posts by views in the last X days
exports.getTopPosts = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const date = new Date();
    date.setDate(date.getDate() - days);

    const posts = await Post.find({ date: { $gte: date } }).sort({ postViews: -1 }).limit(10);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search posts by model or tag
exports.searchPosts = async (req, res) => {
  try {
    const query = req.query.q;
    const posts = await Post.find({
      $or: [
        { model: new RegExp(query, 'i') },
        { tag: new RegExp(query, 'i') },
      ],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
