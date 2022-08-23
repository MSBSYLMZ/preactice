import { GraphQLClient } from "graphql-request";
import { server, app } from "../server";
import { execSync } from "child_process";
import { Server } from "http";

type TestContext = {
	client: GraphQLClient;
};

export function createTestContext(): TestContext {
	let ctx = {} as TestContext;
	const graphqlCtx = graphqlTestContext();

	beforeEach(async () => {
		const client = await graphqlCtx.before();
		Object.assign(ctx, {
			client,
		});
	});
	afterEach(async () => {});
	afterAll(async () => {
		await graphqlCtx.after();
	});
	return ctx;
}

function graphqlTestContext() {
	let serverInstance: Server;
	return {
		async before() {
			const port = 4000;
			serverInstance = await server.listen({ port });

			return new GraphQLClient(`http://localhost:${port}/api/graphql`);
		},
		async after() {
			execSync("yarn docker:down");
			serverInstance?.close();
		},
	};
}
