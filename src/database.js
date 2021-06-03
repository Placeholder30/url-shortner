const mongoose = require("mongoose");
function init() {
  return mongoose
    .connect("mongodb://localhost:27017/trim", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("connection to database has been established");
    })
    .catch((e) => console.error(e));
}
module.exports = { init };
