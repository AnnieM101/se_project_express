const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const clothingRouter = require("./routes/clothingItems");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.warn);

app.use((req, res, next) => {
  req.user = {
    _id: "689964afa258d6af211bafa4",
  };
  next();
});

app.use("/", indexRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
