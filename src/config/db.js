const mongoose = require('mongoose');
const { startGlobalCron } = require('../controllers/urlController');

const connectDB = async () => {
  try {
    // mongoose v6+ uses the new parser and topology by default.
    // Remove deprecated options (useNewUrlParser, useUnifiedTopology).
    await mongoose.connect(process.env.MONGODB_URI);

 startGlobalCron();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
