import type { NextApiRequest, NextApiResponse } from "next";
import io from "lib/socket";
import type { Server } from "socket.io";

type ISocketResponse = {
	socket: {
		server: {
			io: Server;
		};
	};
} & NextApiResponse;

function socketHandler(req: NextApiRequest, res: ISocketResponse) {
	res.socket.server.io = io;
	res.end();
}

export default socketHandler;
