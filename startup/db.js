const mongoose = require('mongoose');

module.exports = () => {
  // MongoDB connection with localhost
  mongoose.connect("mongodb://localhost:27017/simpleapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection successful...");
    })
    .catch((err) => {
      console.log(err);
    }); 
};
