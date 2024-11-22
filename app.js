const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error occurred while connecting to db ", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Home route ");
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
