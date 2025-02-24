"use client";
import { io } from "socket.io-client";

// Connect to your backend on port 8080
const socket = io("https://news-api-xypb.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
