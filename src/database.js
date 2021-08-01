const mongoose = require("mongoose");
async function init() {
  mongoose
    .connect(
      "mongodb+srv://trimmer:vwDWjdJJEEjTJTRQ@cluster0.i2kao.mongodb.net/redis?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("successfully connected to db");
    })
    .catch((err) => console.error(err));
}
module.exports = { init };
