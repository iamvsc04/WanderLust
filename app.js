const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Home route ");
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});
app.get("/listings/new", (req, res) => {
  res.render("listings/create.ejs");
});

app.post("/listings", async (req, res) => {
  let listing = req.body;
  console.log(listing);
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// app.get("/testing", async (req, res) => {
//   let sample = new Listing({
//     title: "place 1",
//     description: "desc about place 1",
//     price: 8654,
//     location: "hyd",
//     country: "IN",
//   });
//   await sample.save();
//   console.log("Sample was saved");
// });

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
