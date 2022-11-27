const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  userid: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  urls: {
    type: Array,
    required: false
  }
});

module.exports = new Mongoose.model("User", UserSchema);