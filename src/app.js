const express = require("express");
const qinu = require("qinu");
const redis = require("redis");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
client.on("error", function (error) {
  console.error(error);
});
client.on("connect", () => {
  console.log("connection to redis db established");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});

app.get("/:id", (req, res) => {
  client.get(req.params.id, (err, reply) => {
    if (err) {
      res.json({
        message: "there was an error prcessing your request, please try again",
      });
    } else {
      res.redirect(301, reply);
    }
  });
});

app.post("/", (req, res) => {
  const { longUrl } = req.body;
  const randomString = qinu({
    length: 6,
  });
  client.set(randomString, longUrl, (err, reply) => {
    if (err) {
      res.status(400).json({
        message:
          "sorry, there was an error processing your request, please try again",
      });
    } else {
      res.status(200).json({ message: randomString });
    }
  });
});

app.listen(process.env.PORT || 3005, () => {
  console.log(`app is now listening on port ${process.env.PORT || 3005}`);
});
