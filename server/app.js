const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routes = require("./routes/worldcuproutes");
const cors = require('cors');
app.use(cors());
app.use("/",routes);
dotenv.config({path:"./config/config.env"});
const db = require("./config/db");
db(app);//db connection
module.exports=app;
