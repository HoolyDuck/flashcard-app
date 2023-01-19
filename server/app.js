const express = require("express");
require('dotenv').config();

const sequelize = require("./db");
const app = express();
const port = process.env.PORT || 8080;

const start = async () => {
  try { 
 
    await sequelize.authenticate()
    await sequelize.sync()
 
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } catch (e) {
    console.log(e);
  }
};

start()
