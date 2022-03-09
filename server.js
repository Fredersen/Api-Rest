// server.js
const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const wilderController = require('./controllers/wilders');
const app = express();

// database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/api/wilders/all", wilderController.findall);
app.get("/api/wilders/city/:city", wilderController.findAllCity);
app.put("/api/wilders/updateWilder/:_id", wilderController.update)
app.post("/api/wilders/create", wilderController.create);
app.delete("/api/wilders/delete/:_id", wilderController.delete)
app.delete("/api/wilders/delete/", wilderController.deleteAll)

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));