const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());

const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

//  connecting to database
const dbURL = process.env.URLDB;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to database");

    // listin to requests
    app.listen(process.env.PORT || 5000, () => {
      console.log(`listining to requests on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
