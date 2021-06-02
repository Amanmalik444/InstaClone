const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 8000;
const registerRoute = require("./routes/register");
const postRoute = require("./routes/post");
const profileRoute = require("./routes/profile");
const loginRoute = require("./routes/login");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//register route
app.use("/register", registerRoute);

//post route
app.use("/post", postRoute);

// profile route
app.use("/profile", profileRoute);

//login route
app.use("/login", loginRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("dbConnected");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
