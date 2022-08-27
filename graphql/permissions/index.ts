import { shield, allow, deny } from "graphql-shield";
import { isAuthenticated } from "./rules/isAuthenticated";
export const permissions = shield({
	Query: {
		"*": isAuthenticated,
	},
	Mutation: {
		"*": isAuthenticated,
	},
});
