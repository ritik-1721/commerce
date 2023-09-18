// * socketWorker.js
const API_URL= "http://localhost:1000/";
//  const API_URL= "http://192.168.43.252:1000/";

// const io = require("socket.io-client");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.0/socket.io.min.js");

const socket = io(API_URL); // Replace with your server's URL

self.addEventListener("message", (e) => {
  const { type, data } = e.data;
  // Emit a message to the server using Socket.io
  if (type === "send-refresh-user") {
    socket.emit("send-refresh-user", data);
  } else if (type === "send-refresh-cart") {
    socket.emit("send-refresh-cart", data);
  } else if (type === "send-refresh-wishlist") {
    socket.emit("send-refresh-wishlist", data);
  } else if (type === "new-user") {
    socket.emit("new-user", data);
  }
});

// Listen for incoming messages from the server and post them back to the main thread
socket.on("refresh-cart", (message) => {
  self.postMessage({ type: "refresh-cart", data: message });
});

socket.on("refresh-user", (message) => {
  self.postMessage({ type: "refresh-user", data: message });
});

socket.on("refresh-wishlist", (message) => {
  self.postMessage({ type: "refresh-wishlist", data: message });
});

socket.on("disconnect", () => {
  self.postMessage({ type: "disconnect", data: message });
});

// Handle other message types as needed
