import express from "express";
require('dotenv').config();

import sequelize from "./db";
const app = express();
const port = process.env.PORT || 8080;

const start = async () => {
  try {

    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(port, () => {
      console.log("Server started")
    });

  } catch (e) {
      console.log(e)
  }
};

start()
