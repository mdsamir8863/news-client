"use client";
import { io } from "socket.io-client";

// Connect to your backend on port 8080
const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
