import NextAuth from "next-auth";
import GoogleProivder from "next-auth/providers/google";

export default NextAuth({
	providers: [
		GoogleProivder({
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
		}),
	],
	// callbacks: {
	// 	async jwt({ token, account }) {
	// 		// Persist the OAuth access_token to the token right after signin
	// 		if (account) {
	// 			token.accessToken = account.access_token;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token from a provider.
	// 		session.accessToken = token.accessToken;
	// 		return session;
	// 	},
	// },
});
