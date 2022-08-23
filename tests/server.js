const Cors = require("micro-cors");
const { createServer } = require("http");
const { parse } = require("url");
const { ApolloServer } = require("apollo-server-micro");
const schema = require("../graphql/schema").default;
const next = require("next");
const prisma = require("./db/client").default;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const server = createServer(async (req, res) => {
	try {
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;

		if (pathname === "/api/graphql") {
			await handler(req, res);
		}
	} catch (err) {
		console.error("Error occurred handling", req.url, err);
		res.statusCode = 500;
		res.end("internal server error");
	}
});

const cors = Cors();
const apolloServer = new ApolloServer({
	schema,
	context: { prisma },
});

// const apolloServer = new ApolloServer({
// 	schema,
// 	context: createContext
// });
const handler = cors(async function handler(req, res) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}
	await apolloServer.start();
	await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
module.exports = { server, app };
