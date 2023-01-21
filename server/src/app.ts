import express from "express";
import cors from "cors";

require("dotenv").config()

import { sequelize } from "./db";

const app = express();
const port = process.env.PORT || 8080;  

const models = require("./models/models");
import router  from "./routes/routes"

app.use('/api', router)

app.use(cors())
app.use(express.json())

const start = async () : Promise<void> => {
  try {

    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(port, () : void => {
      console.log("Server started")
    });

  } catch (e) {
      console.log(e)
  }
};

start()
