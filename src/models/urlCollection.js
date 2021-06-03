const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
  shortUrl: {
    type: String,
    requred: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
});
const Url = mongoose.model("Url", urlSchema);
module.exports = {
  Url,
};
