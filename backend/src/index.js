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
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:1000",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://192.168.43.252:8080",
    ],
  },
});

const port = process.env.PORT || 1000;

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const rooms = {};
// room  => USER_ID

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  console.log("A user rooms:", rooms);

  // ** Add Socket ID IN User ID Room
  socket.on("new-user", ({ room, name }) => {
    if (!rooms[room]) {
      io.emit("room-created", room);
      rooms[room] = {};
      rooms[room].users = {};
    }
    rooms[room].users[socket.id] = name;
    socket.join(room);
    io.to(room).emit("user-connected", name);
    console.log("A rooms update:", rooms);
  });

  socket.on("send-refresh-cart", (room) => {
    if (rooms[room]) {
      socket.to(room).emit("refresh-cart", {
        name: rooms[room].users[socket.id],
      });
    }
    console.log("A send-refresh-cart:", room);
  });

  socket.on("send-refresh-user", (room) => {
    if (rooms[room]) {
      socket.to(room).emit("refresh-user", {
        name: rooms[room].users[socket.id],
      });
    }
    console.log("A send-refresh-user:", room);
  });

  socket.on("send-refresh-wishlist", (room) => {
    if (rooms[room]) {
      io.to(room).emit("refresh-wishlist", {
        name: rooms[room].users[socket.id],
      });
    }
    console.log("A send-refresh-wishlist:", room);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    const userRooms = getUserRooms(socket);

    if (userRooms) {
      userRooms.forEach((room) => {
        try {
          socket
            .to(room)
            .emit("user-disconnected", rooms[room].users[socket.id]);
          delete rooms[room].users[socket.id];
        } catch (error) {
          console.error("Error handling user-disconnected event:", error);
        }
      });
    }
  });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}
