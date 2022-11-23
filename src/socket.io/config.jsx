import { Manager } from "socket.io-client";

const manager = new Manager("ws://localhost:5000", {
  reconnection: true,
  reconnectionDelay: 1000,
});

manager.open((err) => {
  if (err)
    console.log("🚀 ~ file: config.jsx ~ line 6 ~ manager.open ~ err", err);
});

const io_admin = manager.socket("/admin");

const io_client = manager.socket("/client");
export { io_admin, io_client };
