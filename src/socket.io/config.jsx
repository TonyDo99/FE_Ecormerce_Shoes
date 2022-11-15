import { Manager } from "socket.io-client";

const manager = new Manager("ws://localhost:5000", {
  reconnectionDelay: 30000,
  autoConnect: true,
});

export const io_admin = manager.socket("/admin");

export const io_client = manager.socket("/client");
