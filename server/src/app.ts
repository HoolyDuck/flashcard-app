import express from "express";
require('dotenv').config();

import { sequelize } from "./db";

const port = process.env.PORT || 8080;
const models = require("./models/models");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())

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
