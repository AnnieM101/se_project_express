const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const errorHandling = require('./utils/errors');

const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.warn);

app.use("/", indexRouter);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
