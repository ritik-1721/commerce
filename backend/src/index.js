//jshint esversion:6
require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const errno = require("errno");
const sessions = require("express-session");

const staticRoutes = require("./routes/static.routes");
const adminRoutes = require("./routes/admin.routes");
const apiRoutes = require("./routes/api.routes");

const app = express();
const port = process.env.PORT || 2000;

//serving public file
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// Middlewares
// Use the session middleware
// app.use(session({ secret: "", cookie: { maxAge: 60000 } }));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "keyboard cat",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"));

//req.session.userDate ={ userName:"ritik" , userRoutes:"/", userEmail:"ritik.pawar@gmail.com"};
//req.session.destroy();
// Without middleware

app.get("/", function (req, res) {
  res.redirect("/admin");
});
app.use("/static", staticRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

app.get("*", function (req, res) {
  res.send("Page Not Found?", 404);
});
app.use("*", function (req, res) {
  return res.status(404).json({
    ok: false,
    message: "Page Not Found?",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
