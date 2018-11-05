const mongoose = require('mongoose');
// Set a Mongoose Promise library
mongoose.Promise = global.Promise;
// MongoDB URI - could be in a config file4
let dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/authTutorial';

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('MongoDB Connected.');
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
