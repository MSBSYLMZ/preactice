import { shield, allow } from "graphql-shield";
import { isAuthenticated } from "./rules/isAuthenticated";
export const permissions = shield({
	Query: {
		questions: allow,
		"*": isAuthenticated,
	},
	Mutation: {
		"*": isAuthenticated,
	},
});
