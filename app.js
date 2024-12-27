const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Home route ");
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

app.get("/listings/new", async (req, res) => {
  res.render("listings/new.ejs");
});
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let temp = await Listing.findByIdAndDelete(id);
  console.log(temp);
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
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
