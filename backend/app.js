const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const local = require("passport-local").Strategy;
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

app.use(passport.initialize());
require("./utils/passport")(passport);

//login route
app.use("/login", loginRoute);

//register route
app.use("/register", registerRoute);

//post route
app.use("/post", passport.authenticate("jwt", { session: false }), postRoute);

// profile route
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("dbConnected");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
