import { io } from "socket.io-client";

export const socket = io("ws://localhost:5000", {
  reconnectionDelayMax: 10000,
  autoConnect: true,
});

export const dashboard = io("ws://localhost:5000/admin", {
  reconnectionDelayMax: 10000,
  autoConnect: true,
});
