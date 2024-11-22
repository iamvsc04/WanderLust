const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Listing = require("./models/listing");

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

app.get("/testing", async (req, res) => {
  let sample = new Listing({
    title: "place 1",
    description: "desc about place 1",
    price: 8654,
    location: "hyd",
    country: "IN",
  });
  await sample.save();
  console.log("Sample was saved");
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
