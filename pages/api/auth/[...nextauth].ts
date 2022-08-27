import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProivder from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProivder({
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
		}),
	],
};

export default NextAuth(authOptions);
