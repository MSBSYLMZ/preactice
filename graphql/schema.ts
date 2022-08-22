import { makeSchema } from "nexus";
import * as types from "./types";
import { validatePlugin } from "nexus-validate";
import { join } from "path";

console.log(types)


const schema = makeSchema({
	types,
	outputs: {
		typegen: join(process.cwd(), "node_modules", "@types", "nexus-typegen", "index.d.ts"),
		schema: join(process.cwd(), "graphql", "schema.graphql"),
	},
	contextType: {
		export: "Context",
		module: join(process.cwd(), "graphql", "context.ts"),
	},
	plugins: [validatePlugin()],
});

export default schema;
