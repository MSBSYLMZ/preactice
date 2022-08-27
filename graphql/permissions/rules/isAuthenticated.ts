import { rule } from "graphql-shield";
import { Session } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export const isAuthenticated = rule({ cache: "contextual" })(async (_parent, _args, context, _info) => {
	const { req, res } = context;
	const session: Session | null = await unstable_getServerSession(req, res, authOptions);
	return Boolean(session);
});
