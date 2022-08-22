import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import getPort, { makeRange } from "get-port";
import { GraphQLClient } from "graphql-request";
import { join } from "path";
import server from "../server";
import { prismaMock } from "../db/singleton";
import { createServer, Server } from "http";
import { parse } from "url";
import { NextServer } from "next/dist/server/next";

type TestContext = {
	client: GraphQLClient;
	db: PrismaClient;
};

export function createTestContext(): TestContext {
	let ctx = {} as TestContext;
	const graphqlCtx = graphqlTestContext();
	const prismaCtx = prismaTestContext();

	beforeEach(async () => {
		console.log(process.env.DATABASE_URL);
		const client = await graphqlCtx.before();
		const db = await prismaCtx.before();
		Object.assign(ctx, {
			client,
			db,
		});
	});
	afterEach(async () => {
		//@ts-ignore
		await prismaCtx.after();
	});
	return ctx;
}

function graphqlTestContext() {
	return {
		async before() {
			const port = await getPort({ port: makeRange(4000, 6000) });
			const app = server({});
			const handle = app.getRequestHandler();

			const prepared = await app.prepare();
            //@ts-ignore
			const createdServer: Server = prepared.createServer(async (req, res) => {
				try {
					//@ts-ignore
					const parsedUrl = parse(req.url, true);
					const { pathname, query } = parsedUrl;

					if (pathname === "/a") {
						await app.render(req, res, "/a", query);
					} else if (pathname === "/b") {
						await app.render(req, res, "/b", query);
					} else {
						await handle(req, res, parsedUrl);
					}
				} catch (err) {
					console.error("Error occurred handling", req.url, err);
					res.statusCode = 500;
					res.end("internal server error");
				}
			});
            //@ts-ignore
			const serverInstance = createdServer.listen(port,(err) => {
                if (err) throw err
                console.log(`> Ready on http://${hostname}:${port}`)
              });

			return new GraphQLClient(`http://localhost:${port}/api/graphql`);
		},
	};
}

function prismaTestContext() {
	let prismaClient: null | PrismaClient = null;
	return {
		async before() {
			console.log(process.env.DATABASE_URL);
			prismaClient = prismaMock;
			return prismaClient;
		},
		async after() {
			console.log(process.env.DATABASE_URL);
			execSync(`yarn docker:down`);
			await prismaClient?.$disconnect();
		},
	};
}
