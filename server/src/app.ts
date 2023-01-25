import express from "express";
import cors from "cors";

require("dotenv").config()

const app = express();
const port = process.env.PORT || 8080;  

import router  from "./routes/routes"



app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () : Promise<void> => {
  try {
    app.listen(port, () : void => {
      console.log("Server started")
    });

  } catch (e) {
      console.log(e)
  }
};

start()
