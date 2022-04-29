require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const filmRoute = require("./routes/film");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/film', filmRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});