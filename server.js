const config = require("./config/index");

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const route = require("./router/index");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(config.COOKIE_SECRET));

route(app);

//demo

app.get("/demo", (req, res) => {
  res.render("demo");
});

const PORT = process.env.PORT || 80;
const MONGODB_URI = process.env.MONGODB_URI || config.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"));

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
