const mongoose = require("mongoose");
require("dotenv").config();

function connectToDataBase() {
  mongoose.connect(process.env.DB_CONNECTION);
  mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo Atlas Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to Mongo Atlas");
  });
}

module.exports = { connectToDataBase };
