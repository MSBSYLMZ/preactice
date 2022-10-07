import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "../interfaces/socket";

let io: Server;

declare global {
	var io: Server;
}

if (!global.io) {
	io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();
	io.on("connection", socket => {
		socket.on("input-change", msg => {
			socket.broadcast.emit("update-input", msg);
		});
	});

	global.io = io;
}
io = global.io;

export default io;
