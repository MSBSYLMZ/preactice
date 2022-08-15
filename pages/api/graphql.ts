import { ApolloServer } from "apollo-server-micro";
import schema from "../../graphql/schema";
import Cors from "micro-cors";
import { createContext } from "../../graphql/context";

const cors = Cors();

export const config = {
	api: {
		bodyParser: false,
	},
};
const server = new ApolloServer({ schema, context: createContext });

const startServer = server.start();

export default cors(async function handler(req, res) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}
	console.log("We got request ");
	await startServer;
	await server.createHandler({ path: "/api/graphql" })(req, res);
});
