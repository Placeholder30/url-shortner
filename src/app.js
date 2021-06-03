const express = require("express");
const qinu = require("qinu");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { init } = require("./database");
const { Url } = require("./models/urlCollection");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/:id", async (req, res) => {
  try {
    const response = await Url.find({ shortUrl: req.params.id });
    res.redirect(301, response[0].longUrl);
  } catch (error) {
    res.send(error);
  }
});

app.post("/", async (req, res) => {
  const { longUrl } = req.body;
  try {
    const randomString = qinu({
      length: 6,
    });
    const url = await Url.create({ longUrl, shortUrl: randomString });
    res.send({ message: url });
  } catch (error) {
    res
      .status(403)
      .json({ message: "sorry, there was an error processing your request" });
  }
});

const port = 3005;
app.listen(process.env.port || port, () => {
  console.log(`app is now listening on port ${port}`);
  init();
});
