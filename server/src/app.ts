import express from "express";
require("dotenv").config()

import { sequelize } from "./db";

const app = express();
const port = process.env.PORT || 8080;  
const cors = require("cors")
const models = require("./models/models");
import router  from "./routes/routes"

app.use('/api', router)

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
